# 🎂 Birthday Wishes Backend System

This system allows your girlfriend to send birthday wishes through the web app, and you can view them on your laptop in real-time!

## 🚀 **Quick Setup**

### 1. **Install Backend Dependencies**
```bash
npm install express cors
npm install -D nodemon
```

### 2. **Start the Backend Server**
```bash
node server.js
```

The server will start on **http://localhost:3001**

## 📱 **How It Works**

### **For Your Girlfriend (Web App User):**
1. She opens your birthday web app
2. Goes through the countdown and sees the cake
3. Blows out the candle and types her wish
4. Clicks "Make My Wish"
5. Her wish is automatically sent to your laptop via the backend server
6. She sees a success message: *"Your wish has been recorded and sent to the birthday person!"*

### **For You (Laptop Owner):**
1. Keep the backend server running on your laptop
2. Open **http://localhost:3001/admin/wishes** in your browser
3. See all wishes in real-time with timestamps
4. The dashboard auto-refreshes every 30 seconds
5. Each wish shows:
   - ⏰ Timestamp
   - 💭 The wish text
   - 📱 Device info (from which device it was sent)

## 🔌 **API Endpoints**

- **GET** `/api/wishes` - Get all wishes (JSON)
- **POST** `/api/wishes` - Save a new wish
- **GET** `/admin/wishes` - View wishes dashboard (HTML)

## 📊 **Dashboard Features**

- **Real-time updates** - Auto-refreshes every 30 seconds
- **Statistics** - Total wishes count and last update time
- **Beautiful display** - Clean, organized wish cards
- **Device tracking** - See which device each wish came from
- **Timestamps** - Know exactly when each wish was made

## 🛡️ **Fallback System**

If the backend server is not available:
- Wishes are saved locally in the browser (localStorage)
- User gets a fallback message
- App continues to work normally

## 🌐 **Network Access**

To make this work across different devices:

### **Option A: Same WiFi Network**
- Both devices must be on the same WiFi network
- Use your laptop's local IP address (e.g., `http://192.168.1.100:3001`)

### **Option B: Internet Access (Advanced)**
- Deploy the backend to a hosting service (Heroku, Vercel, etc.)
- Update the frontend to use the deployed URL
- Wishes will work from anywhere in the world!

## 🚨 **Troubleshooting**

### **Server won't start:**
- Check if port 3001 is already in use
- Try changing the port in `server.js`

### **Wishes not showing:**
- Make sure the backend server is running
- Check browser console for errors
- Verify the server URL in the frontend code

### **CORS errors:**
- The backend includes CORS support
- If issues persist, check browser console

## 🎯 **Next Steps**

1. **Start the backend server** on your laptop
2. **Share the web app** with your girlfriend
3. **Keep the dashboard open** to see wishes in real-time
4. **Enjoy the birthday wishes** as they come in! 🎉

---

**Happy Birthday! 🎂✨**
