import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons"; // Google + GitHub


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle sign-up form submission
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle OTP verification
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 px-6">
        <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Verify your email
          </Text>
          <Text className="text-gray-600 mb-4">
            Enter the verification code we sent to your email.
          </Text>
          <TextInput
            value={code}
            placeholder="Enter verification code"
            onChangeText={setCode}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-base text-gray-900"
          />
          <TouchableOpacity
            onPress={onVerifyPress}
            className="bg-indigo-600 rounded-lg py-3"
          >
            <Text className="text-center text-white font-semibold text-base">
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      {/* Card */}
      <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-1">Sign up</Text>
        <Text className="text-gray-600 mb-6">
          Create your account to get started.
        </Text>

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
          secureTextEntry
          onChangeText={setPassword}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-6 text-base text-gray-900"
        />

        {/* Continue Button */}
        <TouchableOpacity
          onPress={onSignUpPress}
          className="bg-indigo-600 rounded-lg py-3 mb-4"
        >
          <Text className="text-center text-white font-semibold text-base">
            Continue
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="px-2 text-gray-500 text-sm">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Social Buttons */}
        <View className="flex-row justify-between space-x-4 mb-4">
          <TouchableOpacity className="flex-1 border border-gray-300 rounded-lg py-3 flex-row justify-center items-center mr-2">
            <AntDesign name="google" size={20} />
            <Text className="ml-2 text-gray-700">Google</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 border border-gray-300 rounded-lg py-3 flex-row justify-center items-center">
            <AntDesign name="github" size={20} color="#333" />
            <Text className="ml-2 text-gray-700">GitHub</Text>
          </TouchableOpacity>
        </View>

        {/* Sign-in Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-700">Already have an account? </Text>
          <Link href="/sign-in">
            <Text className="text-indigo-600 font-semibold">Sign in</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
