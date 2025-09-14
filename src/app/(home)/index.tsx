import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { SignOutButton } from "@/app/components/SignOutButton";

export default function Page() {
  const { user } = useUser();

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center px-6">
      <SignedIn>
        {/* Card */}
        <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 items-center">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Welcome 👋
          </Text>
          <Text className="text-gray-700 mb-6">
            Signed in as{" "}
            <Text className="font-semibold text-indigo-600">
              {user?.emailAddresses[0].emailAddress}
            </Text>
          </Text>

          {/* Sign out button */}
          <SignOutButton />
        </View>
      </SignedIn>

      <SignedOut>
        {/* Card */}
        <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 items-center">
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to My App
          </Text>
          <Text className="text-gray-600 mb-6 text-center">
            Please sign in or create an account to continue.
          </Text>

          {/* Buttons */}
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity className="w-full bg-indigo-600 rounded-lg py-3 mb-3">
              <Text className="text-center text-white font-semibold text-base">
                Sign In
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity className="w-full bg-gray-200 rounded-lg py-3">
              <Text className="text-center text-gray-800 font-semibold text-base">
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}
