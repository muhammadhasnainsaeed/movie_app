# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## MovieFlix overview

This project is a **movie browsing app** built with **Expo + React Native** using:

- `expo-router` for file-based navigation
- `nativewind` for styling
- TMDB as the external movie API
- `react-native-appwrite` + Appwrite Cloud for storing search analytics and powering **Trending Movies**

### Features

- **Home tab**
  - Hero background with logo
  - Search bar entry point
  - Horizontal **Trending Movies** list (data from Appwrite)
  - Grid of **Latest Movies** (data from TMDB)
- **Search tab**
  - Debounced (500ms) movie search
  - Results displayed in a responsive grid
  - Each successful search updates Appwrite to track popularity
- **Movie details**
  - Poster, title, year, runtime
  - Rating, votes, genres
  - Budget, revenue, and production companies

### Appwrite & TMDB config

Environment variables (in `.env`):

```bash
EXPO_PUBLIC_MOVIE_API_KEY=YOUR_TMDB_API_KEY

EXPO_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=6981a9f9002db04e2170
EXPO_PUBLIC_APPWRITE_PROJECT_NAME=MovieFlix
EXPO_PUBLIC_APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=YOUR_COLLECTION_ID
```

On Appwrite Console, add platforms that match your app IDs:

- Android package: `com.movieflix.app`
- iOS bundle identifier: `com.movieflix.app`
- For Expo Go development: also register `host.exp.Exponent`

The Appwrite client (in `services/appwrite.ts`) uses:

- `setProject("6981a9f9002db04e2170")`
- `setEndpoint("https://fra.cloud.appwrite.io/v1")`
- `setPlatform(...)` based on the native application ID

If the platform IDs don’t match what is configured in Appwrite Console, you’ll see an **Invalid Origin** error.
