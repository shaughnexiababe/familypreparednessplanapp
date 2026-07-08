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

## Public Deployment

### 1. Web & PWA Deployment (Recommended for Instant Access)
The fastest way to share your app is by deploying it as a **Progressive Web App (PWA)**.
1. **Push to Vercel/Netlify**: Your project is already configured for Vercel. Simply push your code to your repository.
2. **Installation**: Once live, users can visit the URL in Chrome (Android) or Safari (iOS).
   - **Android**: Tap the "Add to Home Screen" prompt or the three dots > "Install App".
   - **iOS**: Tap the "Share" icon > "Add to Home Screen".
3. **Benefits**: The app will work offline, have its own icon, and run in full-screen mode without a browser bar.

### 2. Native Android App (Play Store / APK)
If you want to distribute a native `.apk` or list it on the Google Play Store:
1. Ensure you have **Android Studio** installed.
2. Run `npx cap open android`.
3. In Android Studio, go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
4. You can share the resulting `.apk` file directly or follow Google's guide to upload the `.aab` to the Play Store.

### 3. App Icons & Splash Screens
To make the app look professional:
1. Replace the placeholder icons in the `public/` folder with your own `pwa-192x192.png` and `pwa-512x512.png`.
2. Use the [Capacitor Assets](https://github.com/ionic-team/capacitor-assets) tool to generate all native icons and splash screens:
   ```bash
   npx @capacitor/assets generate --android
   ```
