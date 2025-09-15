// Configuration for Convex + Clerk authentication
// The EXPO_PUBLIC_CLERK_ISSUER_URL should be set in your .env file
// You can find this in your Clerk Dashboard under Configure → Session Management → JWT Templates
export default {
  providers: [
    {
      domain: process.env.EXPO_PUBLIC_CLERK_ISSUER_URL || "YOUR_CLERK_ISSUER_URL", // Replace with your actual Issuer URL from Clerk JWT Template
      applicationID: "convex",
    },
  ],
};