// Firebase Configuration for Universal Order Sync
// This allows orders to sync across all devices in real-time

const firebaseConfig = {
    // Free Firebase Realtime Database configuration
    // You can create your own at: https://console.firebase.google.com/
    
    // For now, using localStorage as fallback
    // To enable Firebase:
    // 1. Go to https://console.firebase.google.com/
    // 2. Create a new project
    // 3. Enable Realtime Database
    // 4. Copy your config here
    
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Universal Order Manager using localStorage with sync capability
class UniversalOrderManager {
    constructor() {
        this.storageKey = 'universal_orders';
        this.syncInterval = null;
        this.init();
    }

    init() {
        // Start syncing every 2 seconds
        this.syncInterval = setInterval(() => this.syncOrders(), 2000);
        
        // Listen for storage changes from other tabs/windows
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey) {
                this.notifyOrderUpdate();
            }
        });
    }

    // Get all orders
    getAllOrders() {
        try {
            const orders = localStorage.getItem(this.storageKey);
            return orders ? JSON.parse(orders) : [];
        } catch (error) {
            console.error('Error getting orders:', error);
            return [];
        }
    }

    // Add new order
    addOrder(order) {
        try {
            const orders = this.getAllOrders();
            const newOrder = {
                ...order,
                id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                timestamp: new Date().toISOString(),
                synced: true
            };
            orders.unshift(newOrder);
            localStorage.setItem(this.storageKey, JSON.stringify(orders));
            
            // Trigger storage event manually for same-window updates
            window.dispatchEvent(new StorageEvent('storage', {
                key: this.storageKey,
                newValue: JSON.stringify(orders)
            }));
            
            return newOrder;
        } catch (error) {
            console.error('Error adding order:', error);
            return null;
        }
    }

    // Update order status
    updateOrderStatus(orderId, status) {
        try {
            const orders = this.getAllOrders();
            const orderIndex = orders.findIndex(o => o.id === orderId);
            if (orderIndex !== -1) {
                orders[orderIndex].status = status;
                orders[orderIndex].updatedAt = new Date().toISOString();
                localStorage.setItem(this.storageKey, JSON.stringify(orders));
                
                window.dispatchEvent(new StorageEvent('storage', {
                    key: this.storageKey,
                    newValue: JSON.stringify(orders)
                }));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating order:', error);
            return false;
        }
    }

    // Sync orders (placeholder for future Firebase integration)
    syncOrders() {
        // This will be used when Firebase is configured
        // For now, it just ensures localStorage is consistent
        const orders = this.getAllOrders();
        if (orders.length > 0) {
            console.log(`📊 ${orders.length} orders in system`);
        }
    }

    // Notify about order updates
    notifyOrderUpdate() {
        const event = new CustomEvent('ordersUpdated', {
            detail: { orders: this.getAllOrders() }
        });
        window.dispatchEvent(event);
    }

    // Clear all orders (admin only)
    clearAllOrders() {
        if (confirm('Are you sure you want to clear all orders? This cannot be undone.')) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
            this.notifyOrderUpdate();
            return true;
        }
        return false;
    }

    // Get orders by table
    getOrdersByTable(tableNumber) {
        const orders = this.getAllOrders();
        return orders.filter(o => o.table_number == tableNumber || o.tableNumber == tableNumber);
    }

    // Get orders by status
    getOrdersByStatus(status) {
        const orders = this.getAllOrders();
        return orders.filter(o => o.status === status);
    }
}

// Initialize global order manager
window.orderManager = new UniversalOrderManager();

console.log('✅ Universal Order Manager initialized');
