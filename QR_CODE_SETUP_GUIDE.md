# 🍽️ Table QR Code System - Setup Guide

## ✅ What's Been Implemented

Your Canteen Management System now has a **complete table-specific QR code system** that allows customers to scan QR codes and automatically be assigned to their table number.

---

## 📋 Features

### 1. **QR Code Generation**
- 5 unique QR codes (one for each table)
- Each QR code links to: `https://glittering-sunflower-3a0c32.netlify.app/c3.html?table=X`
- Printable format for easy placement on tables

### 2. **Table Selection Screen**
- If a customer visits without scanning a QR code, they see a table selection screen
- They must select their table number (1-5) before proceeding
- Table number is saved and displayed throughout their session

### 3. **Table Number Tracking**
- Table number is shown in the app header: "📍 Table X"
- All orders include the table number
- Admin can see which table placed each order

---

## 🚀 How to Use

### Step 1: Generate QR Codes
1. Open `qr-codes.html` in your browser
2. You'll see 5 QR codes (one for each table)
3. Click **"🖨️ Print All QR Codes"** to print them
4. Or click **"💾 Download All QR Codes"** and select "Save as PDF"

### Step 2: Place QR Codes on Tables
1. Cut out each QR code
2. Laminate them (recommended for durability)
3. Place each QR code on its respective table
4. Make sure they're visible and easy to scan

### Step 3: Customer Flow
1. **Customer scans QR code** on their table
2. Browser opens to your Netlify site with table number automatically set
3. Customer logs in or creates an account
4. **Table number appears in header**: "📍 Table 3"
5. Customer places order
6. Order is sent to admin with table number included

### Step 4: Admin View
1. Admin sees all orders in the admin portal
2. Each order shows:
   - Customer name
   - Items ordered
   - **Table number** (clearly displayed)
   - Payment status
   - Timestamp

---

## 📱 Customer Experience

### With QR Code (Recommended):
```
Scan QR → Auto-assigned to Table → Login → Order → Checkout
```

### Without QR Code (Manual):
```
Visit Site → Select Table (1-5) → Login → Order → Checkout
```

---

## 🔗 QR Code URLs

Each QR code contains these URLs:

- **Table 1**: `https://glittering-sunflower-3a0c32.netlify.app/c3.html?table=1`
- **Table 2**: `https://glittering-sunflower-3a0c32.netlify.app/c3.html?table=2`
- **Table 3**: `https://glittering-sunflower-3a0c32.netlify.app/c3.html?table=3`
- **Table 4**: `https://glittering-sunflower-3a0c32.netlify.app/c3.html?table=4`
- **Table 5**: `https://glittering-sunflower-3a0c32.netlify.app/c3.html?table=5`

---

## 🎯 Benefits

✅ **Easy Order Tracking**: Know exactly which table ordered what
✅ **No Manual Entry**: Customers don't need to remember or enter table numbers
✅ **Professional**: Modern QR code system like restaurants use
✅ **Accurate**: No confusion about which table placed an order
✅ **Scalable**: Easy to add more tables in the future

---

## 🛠️ Customization

### To Add More Tables:
1. Open `qr-codes.html`
2. Find line: `const tables = [1, 2, 3, 4, 5];`
3. Add more numbers: `const tables = [1, 2, 3, 4, 5, 6, 7, 8];`
4. Update `c3.html` table selection grid if needed

### To Change QR Code Design:
1. Edit the CSS in `qr-codes.html`
2. Modify `.qr-card` styles for different colors/layouts
3. Change QR code size by updating the API URL parameter

---

## 📞 Support

If you need to:
- Add more tables
- Change the design
- Modify the flow
- Add features

Just let me know!

---

## 🎉 You're All Set!

Your table QR code system is ready to use. Just:
1. Print the QR codes from `qr-codes.html`
2. Place them on your tables
3. Customers scan and order!

The system is already deployed at: **https://glittering-sunflower-3a0c32.netlify.app**
