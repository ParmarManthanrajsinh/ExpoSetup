import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons"; // Google + GitHub

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Logo placeholder */}
        <View className="items-center mb-6">
          <Text className="text-4xl">🌟</Text>
        </View>

        <Text className="text-center text-2xl font-bold text-gray-900 mb-1">
          Sign in to your account
        </Text>
        <Text className="text-center text-gray-600 mb-6">
          Welcome back! Please enter your details.
        </Text>

        {/* Social buttons */}
        <View className="flex-row justify-center space-x-4 mb-6">
          <TouchableOpacity className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2 mr-3">
            <AntDesign name="google" size={20}/>
            <Text className="ml-2 text-gray-700">Google</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
            <AntDesign name="github" size={20} color="#333" />
            <Text className="ml-2 text-gray-700">GitHub</Text>
          </TouchableOpacity>
        </View>

        {/* OR separator */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="px-2 text-gray-500">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Email */}
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={setEmailAddress}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-base text-gray-900"
        />

        {/* Password */}
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={setPassword}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-6 text-base text-gray-900"
        />

        {/* Continue Button */}
        <TouchableOpacity
          onPress={onSignInPress}
          className="bg-indigo-600 rounded-lg py-3 mb-4"
        >
          <Text className="text-center text-white font-semibold text-base">
            Continue
          </Text>
        </TouchableOpacity>

        {/* Sign-up Link */}
        <View className="flex-row justify-center mb-6">
          <Text className="text-gray-700">Don't have an account? </Text>
          <Link href="/sign-up">
            <Text className="text-indigo-600 font-semibold">Sign up</Text>
          </Link>
        </View>

        {/* Secured by Clerk */}
        <Text className="text-center text-xs text-gray-400">
          Secured by Clerk
        </Text>
      </View>
    </View>
  );
}
