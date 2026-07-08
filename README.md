# Android Mobile App Deployment Guide

This guide explains how to turn your **Ligtas CamNorte** React/Vite web application into a fully functional Android mobile app (`.apk` or `.aab` for Google Play Store) using **Capacitor**.

---

## Option 1: Build a Native Android App (Using Capacitor)

Capacitor wraps your web app into a native Android container.

### Prerequisites
1. **Node.js** installed on your computer.
2. **Android Studio** installed (needed to compile the final Android package).
3. **Java JDK 17** installed.

### Step-by-Step Setup

#### 1. Install Capacitor in your project
Open your terminal in your project folder and run:
```bash
npm install @capacitor/core @capacitor/cli
```

#### 2. Initialize Capacitor
Initialize Capacitor with your app's details:
```bash
npx cap init "Ligtas CamNorte" "com.ligtas.camnorte" --web-dir=dist
```
*Note: `--web-dir=dist` tells Capacitor where your compiled React files live.*

#### 3. Install the Android Platform
Install the Android integration package:
```bash
npm install @capacitor/android
npx cap add android
```

#### 4. Build your React App
Every time you make changes to your React code, you must build the web app first:
```bash
npm run build
```

#### 5. Sync the code to Android
Copy your built web files into the Android project:
```bash
npx cap sync
```

#### 6. Open the project in Android Studio
Open the native Android project in Android Studio to build or test it:
```bash
npx cap open android
```

#### 7. Build the APK / Run on Device
Inside Android Studio:
* Connect your Android phone via USB (with USB Debugging enabled in Developer Options).
* Click the **Run** button (green play icon) to install it directly on your phone.
* To generate a shareable installer file, go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

#### 8. Add Push Notifications (Firebase Cloud Messaging)
To enable real-time emergency alerts:
1. **Firebase Console**: Create a project at [firebase.google.com](https://console.firebase.google.com/).
2. **Add Android App**: Register your app using the package name `com.ligtas.camnorte`.
3. **Download Config**: Download the `google-services.json` file and place it in the `android/app/` folder of your project.
4. **Install Plugin**: Run the following in your terminal:
   ```bash
   npm install @capacitor/push-notifications
   npx cap update android
   ```
5. **Push Notification Icons**: For Android, you should add notification icons to `android/app/src/main/res` to ensure they display correctly in the status bar.

---

## Option 2: Progressive Web App (PWA)

If you don't want to install Android Studio or upload to the Google Play Store, you can make this a Progressive Web App. 

PWAs allow users to visit your website in Google Chrome on Android and click **"Add to Home Screen"**. It will install as an app icon, run full-screen without the browser address bar, and work offline!

### How to set up PWA:
1. Deploy your website to a free hosting provider like **Vercel** or **Netlify**.
2. When users open your link in Chrome on their Android phone, they will see a prompt saying **"Install App"** or **"Add to Home Screen"**.
3. Once added, it behaves exactly like a native mobile app!
