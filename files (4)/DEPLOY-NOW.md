# 🎉 Peel - READY TO DEPLOY!

**All Firebase credentials are configured!** ✅

---

## ✅ What's Already Done:

- ✅ Firebase config added (API key, Project ID, App ID)
- ✅ VAPID key configured for push notifications
- ✅ Service Worker set up
- ✅ PWA manifest configured
- ✅ Cloud Functions written
- ✅ Firestore security rules ready

---

## 🚀 Final Steps to Deploy (15 minutes)

### Step 1: Enable Firebase Services (5 min)

Go to Firebase Console: https://console.firebase.google.com/project/peel-reminder

#### A. Enable Firestore Database
1. Click **"Firestore Database"** in left menu
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose location: **us-central** (or closest)
5. Click **"Enable"**

#### B. Enable Authentication
1. Click **"Authentication"** in left menu
2. Click **"Get started"**
3. Click **"Anonymous"** sign-in provider
4. Toggle **"Enable"**
5. Click **"Save"**

#### C. Upgrade to Blaze Plan (for Cloud Functions)
1. Click **"Upgrade"** in bottom left corner
2. Select **"Blaze (Pay as you go)"**
3. Add a payment method
4. **Don't worry about cost:**
   - Free tier: 2M function calls/month
   - You'll use ~45,000/month
   - **Expected cost: $0/month**

---

### Step 2: Deploy to Firebase Hosting (10 min)

#### Option A: Using Firebase CLI (Recommended)

**Install Firebase CLI:**

**Mac/Linux:**
```bash
curl -sL https://firebase.tools | bash
```

**Windows:**
Download installer from: https://firebase.tools

**Deploy Steps:**

1. **Extract the code:**
   ```bash
   tar -xzf peel-app-FINAL.tar.gz
   cd peel-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the app:**
   ```bash
   npm run build
   ```

4. **Login to Firebase:**
   ```bash
   firebase login
   ```
   (Opens browser, sign in with your Google account)

5. **Deploy everything:**
   ```bash
   firebase deploy
   ```

6. **Your app is now live at:**
   ```
   https://peel-reminder.web.app
   ```

#### Option B: Using GitHub + Firebase CLI

1. **Create GitHub repo:**
   - Go to https://github.com/new
   - Name: `peel-reminder`
   - Create repository

2. **Upload code to GitHub:**
   - Extract `peel-app-FINAL.tar.gz`
   - Upload all files via GitHub web interface
   - Or use GitHub Desktop

3. **Deploy from your computer:**
   - Clone the repo
   - Run steps from Option A above

---

### Step 3: Deploy Cloud Functions (included in firebase deploy)

The `firebase deploy` command will deploy:
- ✅ Web app to Firebase Hosting
- ✅ Cloud Functions for notification scheduling
- ✅ Firestore security rules
- ✅ Storage rules

**Check Functions deployed successfully:**
1. Go to: https://console.firebase.google.com/project/peel-reminder/functions
2. You should see:
   - `onPeelCreated`
   - `onPeelUpdated`
   - `sendDueNotifications`

---

### Step 4: Test on Your iPhone (5 min)

1. **Open Safari on your iPhone**
   - Go to: `https://peel-reminder.web.app`

2. **Install the PWA:**
   - Tap the **Share** button (box with arrow)
   - Scroll down
   - Tap **"Add to Home Screen"**
   - Name it: `Peel`
   - Tap **"Add"**

3. **Open Peel from home screen:**
   - Complete the onboarding
   - When asked for notifications, tap **"Allow"**

4. **Create a test peel:**
   - Tap **"Add a peel"**
   - Title: `Test Notification`
   - Interval: `15 minutes`
   - Start time: (current time)
   - End time: (1 hour from now)
   - Tap **"Add Peel"**

5. **Wait 15 minutes:**
   - You should get a notification!
   - If not, check troubleshooting below

---

## 🐛 Troubleshooting

### Notifications Not Arriving?

**Check 1: Firestore**
1. Go to: https://console.firebase.google.com/project/peel-reminder/firestore
2. Navigate to: `users` → (your user ID) → `peels`
3. Verify your peel is saved

**Check 2: FCM Token**
1. Open Peel on your iPhone
2. Open Safari DevTools (connect to Mac)
3. Look for "FCM Token:" in console logs
4. Verify token is saved in Firestore under `users` → (user ID)

**Check 3: Cloud Functions**
1. Go to: https://console.firebase.google.com/project/peel-reminder/functions
2. Click on `sendDueNotifications`
3. Check logs for errors
4. Verify it's running every 5 minutes

**Check 4: iOS Permissions**
1. Settings → Peel → Notifications
2. Make sure "Allow Notifications" is ON
3. Try removing and re-adding to home screen

**Check 5: Open the app regularly**
- iOS may throttle notifications if you don't open the app
- Open Peel at least once every 2-3 days for best results

### Build Errors?

```bash
cd peel-app
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Functions Not Deploying?

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### Need to redeploy?

```bash
cd peel-app
npm run build
firebase deploy
```

---

## 📊 What to Expect

**First notification:**
- May take up to 15 minutes after creating peel
- Depends on when the scheduled function runs (every 5 min)

**Notification timing:**
- iOS PWA notifications are best-effort
- May arrive 1-3 minutes late
- This is normal for PWAs on iOS

**Battery impact:**
- Minimal - functions run server-side
- App uses standard iOS notification system

---

## 🎯 Next Steps After It Works

1. **Create real peels:**
   - Medication reminders
   - Hydration tracking
   - Vitamin reminders

2. **Monitor usage:**
   - Check Firebase Console → Functions → Logs
   - Track notification delivery
   - Monitor Firestore read/write usage

3. **Create proper app icons:**
   - Generate 192x192 and 512x512 PNG
   - Replace emoji placeholder in `public/` folder

4. **Share with others:**
   - Anyone can visit `https://peel-reminder.web.app`
   - Each user gets their own anonymous account
   - Data is isolated per user

---

## 💰 Cost Monitoring

**Check your usage:**
https://console.firebase.google.com/project/peel-reminder/usage

**Expected monthly usage (solo):**
- Cloud Functions: ~45,000 invocations (free tier: 2M)
- Firestore Reads: ~15,000 (free tier: 50K/day)
- Firestore Writes: ~3,000 (free tier: 20K/day)
- Hosting: <100MB bandwidth (free tier: 360MB/day)

**Monthly cost: $0** ✅

---

## 🎊 You're Ready!

Your complete checklist:

- [ ] Enable Firestore in Firebase Console
- [ ] Enable Authentication (Anonymous) in Firebase Console
- [ ] Upgrade to Blaze plan
- [ ] Run `npm install` in peel-app folder
- [ ] Run `npm run build`
- [ ] Run `firebase login`
- [ ] Run `firebase deploy`
- [ ] Visit app on iPhone: `https://peel-reminder.web.app`
- [ ] Add to Home Screen
- [ ] Grant notification permissions
- [ ] Create test peel
- [ ] Wait 15 min for first notification! 🎉

**Everything is configured. Just deploy and test!**

Need help with any step? The code is ready to go! 🚀
