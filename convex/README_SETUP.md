# Convex + Clerk Integration Setup

This document explains how Convex has been properly integrated with your Expo + Clerk project according to the official Convex documentation.

## Setup Overview

1. Convex has been initialized with `npx convex dev`
2. Proper authentication configuration with Clerk using JWT templates
3. A sample `messages` module has been created with:
   - `getMessages` query to fetch all messages
   - `sendMessage` mutation to add new messages
4. Proper Convex+Clerk integration using `ConvexProviderWithClerk`
5. Sample components demonstrating the integration

## Required Configuration Steps

### 1. Create JWT Template in Clerk Dashboard

**This is a crucial step that must be completed:**

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to "Configure" → "Session Management" → "JWT Templates"
3. Click "Create JWT Template"
4. Select "Convex" from the template options (if available) or create a custom one
5. Copy the "Issuer URL" that is generated

### 2. Update Environment Variables

Update the `.env` file with your actual Clerk Issuer URL:
```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
EXPO_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
EXPO_PUBLIC_CLERK_ISSUER_URL=https://your-domain.clerk.accounts.dev  # Your actual Issuer URL
```

**Important**: In Expo projects, only environment variables prefixed with `EXPO_PUBLIC_` are accessible in client-side code. This is a security feature to prevent accidental exposure of sensitive variables.

### 3. Update Convex Authentication Configuration

The `convex/auth.config.ts` file is configured to use the `EXPO_PUBLIC_CLERK_ISSUER_URL` environment variable:
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

### 4. Provider Integration

Properly integrated Clerk and Convex in `src/app/_layout.tsx`:
- Uses `ConvexProviderWithClerk` for proper authentication flow
- Correct provider order (Clerk wrapping Convex)
- Includes `ClerkLoaded` wrapper

### 5. Using Authentication in Components

Use the `useConvexAuth` hook to check authentication status:
```typescript
import { useConvexAuth } from "convex/react";

const { isAuthenticated, isLoading } = useConvexAuth();
```

## How to Use

1. Run the Convex development server:
   ```bash
   npm run convex-dev
   ```

2. Start your Expo app:
   ```bash
   npm start
   ```

3. Navigate to the "Check Auth Integration" screen after signing in to verify the integration.

## Key Integration Points

- The Convex client is initialized in `src/app/providers/ConvexProvider.tsx` using `ConvexProviderWithClerk`
- Authentication context from Clerk is properly passed to Convex functions
- Sample usage is demonstrated in `src/app/(home)/auth-demo.tsx`

## Adding New Functions

1. Create new `.ts` files in the `convex/` directory
2. Export queries and mutations using the `query` and `mutation` helpers
3. Access your functions in React components using the generated `api` object
4. The Convex development server will automatically pick up changes

## Example Usage

```typescript
// In your React component
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// Query data
const messages = useQuery(api.messages.getMessages);

// Mutate data
const sendMessage = useMutation(api.messages.sendMessage);
```

## Troubleshooting

If you see "Auth token is not a valid JWT" errors:
1. Ensure you've created the JWT template in the Clerk dashboard
2. Verify that the `EXPO_PUBLIC_CLERK_ISSUER_URL` in your `.env` file matches your Clerk Issuer URL
3. Make sure your dependencies are up to date

If environment variables are not showing up in your app:
1. Ensure they are prefixed with `EXPO_PUBLIC_`
2. Restart your development server after making changes to `.env`
3. Check that you're accessing them correctly in your code

## Learn More

- [Convex Documentation](https://docs.convex.dev)
- [Clerk Documentation](https://clerk.com/docs)
- [User Authentication with Clerk and Convex Guide](https://stack.convex.dev/user-authentication-with-clerk-and-convex)