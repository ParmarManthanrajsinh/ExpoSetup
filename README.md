# Expo Router with Clerk and Convex Integration

This project is built with [Expo Router](https://docs.expo.dev/router/introduction/) and integrates [Clerk](https://clerk.com/) for authentication and [Convex](https://convex.dev/) as the backend/database. It also uses [Nativewind](https://www.nativewind.dev/v4/overview/) for styling.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
EXPO_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
EXPO_PUBLIC_CLERK_ISSUER_URL=https://your-domain.clerk.accounts.dev
```

#### Getting Your Clerk Credentials

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or select an existing one
3. Find your "Publishable Key" in the API Keys section

#### Setting up Clerk JWT Template for Convex

1. In your Clerk Dashboard, navigate to "Configure" → "Session Management" → "JWT Templates"
2. Click "Create JWT Template"
3. Select "Convex" from the template options (if available) or create a custom one
4. Copy the "Issuer URL" that is generated

### 3. Configure Convex

Make sure the `convex/auth.config.ts` file has the correct domain configuration:

```typescript
export default {
  providers: [
    {
      domain: process.env.EXPO_PUBLIC_CLERK_ISSUER_URL || "YOUR_CLERK_ISSUER_URL",
      applicationID: "convex",
    },
  ],
};
```

### 4. Run the Development Servers

You'll need to run two terminals:

**Terminal 1 - Convex Development Server:**
```bash
npm run convex-dev
```

**Terminal 2 - Expo Development Server:**
```bash
npm start
```

You can also run on specific platforms:
```bash
npm run android
npm run ios
npm run web
```

## 📁 Project Structure

- `src/app/` - Main application screens and routing
  - `(auth)/` - Authentication screens (sign-in, sign-up)
  - `(home)/` - Authenticated screens (main app)
  - `components/` - Shared components
  - `providers/` - Context providers (Convex)
- `convex/` - Convex functions and configuration
- `src/asserts/` - Assets like fonts and images

## 🔐 Authentication Flow

1. Users navigate to `/sign-in` or `/sign-up` when not authenticated
2. After successful authentication with Clerk, users are redirected to the home screen
3. Convex is integrated with Clerk for secure backend calls

## 🔄 Convex Integration

The project uses `ConvexProviderWithClerk` to properly integrate Clerk authentication with Convex:

```typescript
// In your components
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// Query data
const messages = useQuery(api.messages.getMessages);

// Mutate data
const sendMessage = useMutation(api.messages.sendMessage);
```

## 🎨 Styling

This project uses [Nativewind](https://www.nativewind.dev/v4/overview/) (Tailwind CSS for React Native) for styling components.

Example:
```jsx
<View className="flex-1 justify-center items-center bg-gray-100 px-6">
  <Text className="text-2xl font-bold text-gray-900">Hello World</Text>
</View>
```

## 🚀 Deployment

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)