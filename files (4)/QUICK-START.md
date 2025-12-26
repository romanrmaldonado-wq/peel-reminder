# ⚡ Quick Start - Get Your VAPID Key

Your Firebase config is already added! Now you just need the VAPID key for push notifications.

## Step 1: Get VAPID Key (2 minutes)

1. Go to Firebase Console: https://console.firebase.google.com/project/peel-reminder/settings/cloudmessaging

2. Scroll down to **"Web Push certificates"** section

3. Click **"Generate key pair"**

4. Copy the key (starts with "B..." - it's a long string)

5. Save it somewhere - you'll paste it in the next step

---

## Step 2: Update the Code

Once you have the VAPID key, open this file:
**`src/firebase.js`**

Find this line (around line 34):
```javascript
vapidKey: 'YOUR_VAPID_KEY' // We'll get this from Firebase Console
```

Replace `'YOUR_VAPID_KEY'` with your actual key:
```javascript
vapidKey: 'BAbCd1234...' // Your actual VAPID key
```

---

## Step 3: Enable Required Services

### A. Enable Firestore
1. Firebase Console → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Location: **us-central** (or closest to you)
5. Click **"Enable"**

### B. Enable Authentication
1. Firebase Console → **Authentication**
2. Click **"Get started"**
3. Click **"Anonymous"** provider
4. Toggle **"Enable"**
5. Click **"Save"**

### C. Upgrade to Blaze Plan (Required for Cloud Functions)
1. Firebase Console → Click **"Upgrade"** in bottom left
2. Select **"Blaze (Pay as you go)"**
3. Don't worry - you won't be charged. Free tier includes:
   - 2M Cloud Function calls/month (you'll use ~45K)
   - Unlimited Cloud Messaging
   - You only pay if you exceed limits

---

## Step 4: Deploy Options

### Option A: Deploy via GitHub (Recommended - No Terminal)

1. **Create GitHub repo:**
   - Go to https://github.com/new
   - Name: `peel-reminder`
   - Click **"Create repository"**

2. **Upload code:**
   - Download `peel-app-source-with-firebase.tar.gz`
   - Extract it on your computer
   - In GitHub repo, click **"uploading an existing file"**
   - Drag ALL files from `peel-app` folder
   - Commit changes

3. **Set up Firebase Hosting:**
   ```
   We'll use Firebase CLI for this - see FIREBASE-SETUP-GUIDE.md Part 3
   ```

### Option B: Quick Deploy with Firebase CLI

1. **Install Firebase CLI:**
   - Mac: `curl -sL https://firebase.tools | bash`
   - Windows: Download from https://firebase.tools

2. **Deploy:**
   ```bash
   cd peel-app
   npm install
   npm run build
   firebase login
   firebase deploy
   ```

3. **Your app will be live at:**
   `https://peel-reminder.web.app`

---

## Step 5: Test on iPhone

1. **Open on iPhone:**
   - Visit: `https://peel-reminder.web.app`
   - Or your custom domain if you set one up

2. **Install as PWA:**
   - Tap Share button
   - "Add to Home Screen"
   - Name it "Peel"
   - Tap "Add"

3. **Grant permissions:**
   - Open Peel from home screen
   - Go through onboarding
   - Allow notifications when prompted

4. **Create test peel:**
   - Title: "Test"
   - Interval: 15 minutes
   - Start time: now
   - End time: 1 hour from now
   - Save

5. **Wait 15 minutes** for notification!

---

## ✅ Checklist

Before deploying, make sure:
- [x] Firebase config added to `src/firebase.js` ✅ (Done!)
- [ ] VAPID key added to `src/firebase.js`
- [ ] Firestore enabled in Firebase Console
- [ ] Authentication (Anonymous) enabled
- [ ] Upgraded to Blaze plan
- [ ] Code built successfully: `npm run build`
- [ ] Deployed to Firebase Hosting

---

## 🐛 Quick Troubleshooting

**Build fails?**
```bash
cd peel-app
rm -rf node_modules
npm install
npm run build
```

**Functions not deploying?**
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

**Notifications not working?**
1. Check Firebase Console → Functions → Logs
2. Make sure `sendDueNotifications` is running every 5 min
3. Check Firestore → users → [your-id] → peels
4. Verify FCM token is saved

---

## 📞 Need Help?

If you get stuck:
1. Check Firebase Console logs
2. Check browser console (F12) for errors
3. Verify all services are enabled in Firebase
4. Make sure VAPID key is correct

**You're almost there! Just need that VAPID key and you're ready to deploy! 🚀**
