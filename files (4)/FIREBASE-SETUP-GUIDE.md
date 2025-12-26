# Peel - Firebase Setup & GitHub Deployment Guide

## 📋 Prerequisites Checklist

- ✅ Firebase project created: **peel-reminder** (Project ID: peel-reminder)
- ✅ Project number: 488997538612
- ⬜ GitHub account
- ⬜ Firebase config copied from console

---

## Part 1: Complete Firebase Setup

### Step 1: Get Your Firebase Configuration

1. Go to **Firebase Console**: https://console.firebase.google.com/project/peel-reminder

2. Click **⚙️ (Settings icon)** → **Project settings**

3. Scroll to **"Your apps"** section

4. Click **Add app** → Select **Web** (`</>` icon)

5. Fill in:
   - App nickname: `Peel Web App`
   - ✅ Check "Also set up Firebase Hosting"
   - Click **Register app**

6. **COPY THIS ENTIRE CONFIG** (you'll need it soon):
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "peel-reminder.firebaseapp.com",
     projectId: "peel-reminder",
     storageBucket: "peel-reminder.appspot.com",
     messagingSenderId: "488997538612",
     appId: "1:488997538612:web:..."
   };
   ```

7. Click **Continue to console**

### Step 2: Enable Required Firebase Services

#### A. Enable Firestore Database

1. In Firebase Console, click **Firestore Database** in left menu
2. Click **Create database**
3. Select **Start in production mode**
4. Choose location: **us-central** (or closest to you)
5. Click **Enable**

#### B. Enable Cloud Messaging (FCM)

1. Click **⚙️ Settings** → **Project settings**
2. Go to **Cloud Messaging** tab
3. Scroll to **Web Push certificates**
4. Click **Generate key pair**
5. **COPY THE VAPID KEY** (starts with "B...")
   - Save this somewhere - you'll need it later!

#### C. Enable Authentication

1. Click **Authentication** in left menu
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Click **Anonymous**
5. Toggle **Enable**
6. Click **Save**

#### D. Enable Cloud Functions

1. Click **Functions** in left menu
2. Click **Get started** (if prompted)
3. Click **Upgrade project** to Blaze (pay-as-you-go)
   - Don't worry: Free tier includes 2M invocations/month
   - You won't be charged unless you go over limits

### Step 3: Update Firebase Config in Code

You need to update 2 files with your Firebase config:

**File 1: `src/firebase.js`**
- Replace `YOUR_API_KEY` with your actual apiKey
- Replace `YOUR_APP_ID` with your actual appId  
- Replace `YOUR_VAPID_KEY` with the key you generated

**File 2: `public/sw.js`** (Service Worker)
- You'll need to add Firebase config here too for background notifications

---

## Part 2: Deploy to GitHub (No Terminal Needed!)

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click **"+"** (top right) → **New repository**
3. Fill in:
   - Repository name: `peel-reminder`
   - Description: `Gentle reminders that repeat automatically`
   - ✅ Public (or Private if you prefer)
   - ✅ Add a README file
   - Click **Create repository**

### Step 2: Upload Your Code to GitHub

**Option A: Using GitHub Web Interface (Easiest)**

1. Download and extract `peel-app-source.tar.gz` on your computer

2. In your new GitHub repo, click **"uploading an existing file"** link

3. Drag and drop ALL files from the `peel-app` folder
   - Make sure to include hidden files (`.firebaserc`, etc.)
   
4. Scroll down, add commit message: `Initial commit - Peel MVP`

5. Click **Commit changes**

**Option B: Using GitHub Desktop (If you have it)**

1. Open GitHub Desktop
2. File → Clone repository → Select `peel-reminder`
3. Extract `peel-app-source.tar.gz`
4. Copy all files into the cloned repo folder
5. Commit and push

### Step 3: Set Up GitHub Actions for Auto-Deploy

Create a new file in your repo:

**Path: `.github/workflows/firebase-deploy.yml`**

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: peel-reminder
```

### Step 4: Get Firebase Service Account Key

1. Go to Firebase Console
2. **⚙️ Settings** → **Service accounts** tab
3. Click **Generate new private key**
4. Click **Generate key** (downloads a JSON file)
5. Open the JSON file, **copy the entire contents**

### Step 5: Add Firebase Credentials to GitHub

1. In your GitHub repo, go to **Settings** tab
2. Click **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_SERVICE_ACCOUNT`
5. Value: Paste the entire JSON you copied
6. Click **Add secret**

---

## Part 3: Alternative Deployment (Without GitHub Actions)

If you want to deploy manually using Firebase CLI:

### Install Firebase CLI

**On Mac:**
```bash
curl -sL https://firebase.tools | bash
```

**On Windows:**
Download from: https://firebase.tools

### Deploy Steps

1. Extract `peel-app-source.tar.gz`

2. Open Terminal/Command Prompt in the `peel-app` folder

3. Login to Firebase:
   ```bash
   firebase login
   ```

4. Build the app:
   ```bash
   npm install
   npm run build
   ```

5. Deploy hosting and functions:
   ```bash
   firebase deploy
   ```

6. Your app will be live at:
   `https://peel-reminder.web.app`

---

## Part 4: Configure Your iPhone

### Step 1: Open the App

1. On your iPhone, visit:
   - **GitHub Pages:** `https://YOUR-USERNAME.github.io/peel-reminder` OR
   - **Firebase Hosting:** `https://peel-reminder.web.app`

### Step 2: Install as PWA

1. Tap the **Share** button (box with arrow)
2. Scroll down and tap **"Add to Home Screen"**
3. Name it `Peel`
4. Tap **Add**

### Step 3: Grant Permissions

1. Open Peel from your home screen
2. Go through onboarding
3. When prompted, tap **Allow** for notifications
4. iOS will show system permission dialog - tap **Allow** again

### Step 4: Test a Peel

1. Tap **"Add a peel"**
2. Title: `Test notification`
3. Interval: `15 minutes`
4. Start time: (current time)
5. End time: (1 hour from now)
6. Tap **Add Peel**

7. **Wait 15 minutes** to see if notification arrives!

---

## Troubleshooting

### ❌ No notifications arriving

**Check 1: FCM Token**
- Open browser console (Desktop)
- Look for "FCM Token:" in logs
- Make sure it's being saved to Firestore

**Check 2: Cloud Functions**
- Go to Firebase Console → Functions
- Check if `sendDueNotifications` is running every 5 minutes
- Check logs for errors

**Check 3: iOS Settings**
- Settings → Peel → Notifications
- Make sure "Allow Notifications" is ON

**Check 4: Opening the app**
- Open Peel every 1-2 days
- This keeps notifications active

### ❌ Build fails

- Make sure you updated `src/firebase.js` with real config
- Check that all dependencies installed: `npm install`
- Try deleting `node_modules` and reinstalling

### ❌ Functions not deploying

- Make sure you upgraded to Blaze plan
- Check `functions/package.json` exists
- Run `cd functions && npm install` first

---

## File Checklist - What You Need to Update

### ✅ Before Deploying:

- [ ] `src/firebase.js` - Add your Firebase config + VAPID key
- [ ] `functions/index.js` - Update `webpush.fcmOptions.link` to your URL
- [ ] `public/manifest.json` - Update `start_url` if needed
- [ ] Test locally: `npm run dev`
- [ ] Build successfully: `npm run build`

### ✅ After First Deploy:

- [ ] Test on desktop browser first
- [ ] Check Firebase Console → Firestore for data
- [ ] Check Functions logs
- [ ] Test on iPhone
- [ ] Create test peel
- [ ] Wait for notification

---

## Next Steps After MVP Works

1. **Create proper app icons:**
   - Generate 192x192 and 512x512 PNG icons
   - Replace orangutan emoji placeholder

2. **Improve notification scheduling:**
   - Add timezone support
   - Handle daylight savings
   - Improve next-time calculation

3. **Add features:**
   - Notification history
   - Usage stats
   - Custom notification sounds
   - Multiple users/accounts

4. **Monitor & optimize:**
   - Set up Firebase Analytics
   - Track notification delivery rate
   - Monitor Cloud Function costs

---

## Cost Estimate

**Firebase Free Tier Limits:**
- Firestore: 50K reads, 20K writes per day (free)
- Cloud Functions: 2M invocations per month (free)
- Hosting: 10GB storage, 360MB/day bandwidth (free)
- Cloud Messaging: Unlimited (free)

**Expected Usage for Personal Use:**
- ~1,000 function calls per day (checking peels every 5 min)
- ~100 Firestore writes per day (updating peels)
- ~500 Firestore reads per day (loading app)

**Monthly Cost:** $0 (well within free tier)

---

## Support Resources

- **Firebase Docs:** https://firebase.google.com/docs
- **FCM Web Guide:** https://firebase.google.com/docs/cloud-messaging/js/client
- **Firestore Guide:** https://firebase.google.com/docs/firestore
- **GitHub Actions:** https://docs.github.com/actions

---

**You're ready to deploy! 🚀**

Start with Part 1 (Firebase setup), get your config values, then choose either GitHub deployment or manual Firebase CLI deployment.
