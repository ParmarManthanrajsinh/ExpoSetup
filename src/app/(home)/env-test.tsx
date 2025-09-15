import { Text, View } from "react-native";

export default function EnvTest() {
  // Test if environment variables are accessible
  // Note: Only variables prefixed with EXPO_PUBLIC_ are accessible in client-side code
  const clerkIssuerUrl = process.env.EXPO_PUBLIC_CLERK_ISSUER_URL || "Not set";
  const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "Not set";
  const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL || "Not set";

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center p-6">
      <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Environment Variables Test
        </Text>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">EXPO_PUBLIC_CLERK_ISSUER_URL:</Text>
          <Text className="text-gray-600 break-words">{clerkIssuerUrl}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:</Text>
          <Text className="text-gray-600 break-words">{clerkPublishableKey}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">EXPO_PUBLIC_CONVEX_URL:</Text>
          <Text className="text-gray-600 break-words">{convexUrl}</Text>
        </View>

        <View className="mt-4 p-3 bg-blue-50 rounded-lg">
          <Text className="text-sm text-blue-800">
            Note: Only environment variables prefixed with EXPO_PUBLIC_ are accessible in client-side code.
          </Text>
        </View>
      </View>
    </View>
  );
}