import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";

export default function AuthDemo() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center p-6">
      <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Convex + Clerk Integration
        </Text>
        
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Authentication Status:</Text>
          <Text className="text-gray-600">
            {isLoading ? "Loading..." : isAuthenticated ? "Authenticated ✅" : "Not Authenticated ❌"}
          </Text>
        </View>
        
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">User Info:</Text>
          {user ? (
            <View>
              <Text className="text-gray-600">Name: {user.fullName || "N/A"}</Text>
              <Text className="text-gray-600">Email: {user.emailAddresses[0]?.emailAddress || "N/A"}</Text>
              <Text className="text-gray-600">ID: {user.id}</Text>
            </View>
          ) : (
            <Text className="text-gray-600">No user data available</Text>
          )}
        </View>
        
        <View>
          <Text className="text-lg font-semibold text-gray-700">Integration Status:</Text>
          <Text className="text-gray-600">
            {isAuthenticated ? "✅ Convex and Clerk are properly integrated!" : "❌ Integration issue"}
          </Text>
        </View>
      </View>
    </View>
  );
}