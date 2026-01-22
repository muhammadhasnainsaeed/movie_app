# Movie App - AI Coding Agent Instructions

## Project Overview

This is a **React Native + Expo** universal app (iOS, Android, Web) for movie-related functionality. It uses:

- **Routing**: Expo Router with file-based routing (routes defined in `app/` directory)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Language**: TypeScript (strict mode enabled)
- **Build Tool**: Expo with Metro bundler
- **Entry Point**: `expo-router/entry` → `app/_layout.tsx` → `app/index.tsx`

## Architecture & File Structure

- **`app/`** - File-based routing and screen components
  - `_layout.tsx` - Root layout wrapping all screens with `<Stack>`
  - `index.tsx` - Home screen (currently a placeholder)
  - Other screens follow Expo Router conventions (e.g., `settings.tsx` becomes `/settings` route)
- **`assets/images/`** - App icons, splash screens, favicons (referenced in `app.json`)
- **Root config files**: `app.json` (Expo config), `babel.config.js` (JSX + NativeWind setup), `tailwind.config.js` (styling)

## Styling Approach

- **Use NativeWind**: Apply Tailwind CSS utility classes directly to React Native components
- **Example**: `<View className="flex justify-center items-center" />` (not inline styles)
- **Global styles**: Defined in `app/global.css`, imported in root layout
- **Config**: Tailwind scans `./app/**/*.{js,jsx,ts,tsx}` for class names

## TypeScript Conventions

- Strict mode enabled; all types must be explicit
- Path alias `@/*` maps to project root for imports (e.g., `import { helper } from "@/utils/helpers"`)
- Component files: `.tsx` extension; type all props and state

## Development Workflows

### Starting Development

```bash
npm install  # Install dependencies
npx expo start  # Start dev server (press 'a' for Android, 'i' for iOS, 'w' for web)
```

### Platform-Specific Builds

```bash
npm run android  # Run on Android emulator
npm run ios      # Run on iOS simulator
npm run web      # Run web version
npm run lint     # Check code with ESLint
```

### Resetting Project

```bash
npm run reset-project  # Moves starter code to app-example/, creates fresh app/
```

## Key Dependencies & Integrations

- **expo-router** - File-based routing; understand `[id].tsx` (dynamic routes) and `_layout.tsx` (layout groups)
- **react-native-reanimated** - Animation library (v3.17.4); use for smooth transitions
- **@react-navigation/bottom-tabs** - Bottom tab navigation (import layouts from here if implementing tabs)
- **nativewind** - Babel plugin presets JSX import; modify `babel.config.js` if adding new JSX-in-CSS features
- **expo-status-bar**, **expo-splash-screen** - Already configured in `app.json`; manage via app.json plugins

## Common Patterns & Code Examples

### Creating a New Screen

File: `app/movies.tsx`

```tsx
import { Text, View } from "react-native";

export default function MoviesScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Movies</Text>
    </View>
  );
}
```

### Using Layout with Route Names

File: `app/_layout.tsx` (if expanding from simple Stack)

```tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Common for Expo Router apps
      }}
    />
  );
}
```

### Dynamic Routing Example

File: `app/movies/[id].tsx` - automatically creates route `/movies/123`

```tsx
import { useLocalSearchParams } from "expo-router";

export default function MovieDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>Movie {id}</Text>;
}
```

## Build & Runtime Considerations

- **New Architecture Enabled**: `app.json` has `"newArchEnabled": true` (React 19.1, RN 0.81)
- **React Compiler Enabled**: Experimental optimization; avoid manipulating React internals
- **TypedRoutes**: Enable autocomplete for `href` props in Expo Router v6+
- **Platform Detection**: Use platform-specific file suffixes if needed: `file.ios.tsx`, `file.android.tsx`, `file.web.tsx`

## Gotchas & Important Notes

1. **NativeWind Babel Setup**: Must use `jsxImportSource: "nativewind"` in babel config or className won't work
2. **Expo Go Limitation**: Testing via Expo Go app has limited native module support; use development builds for native modules
3. **Port Conflicts**: Default is 8081; expo start prompts for alternatives if port is in use
4. **CSS Scoping**: Tailwind classes are global; no CSS modules needed in this setup
5. **Absolute Imports**: Always use `@/` path alias over relative paths for maintainability
