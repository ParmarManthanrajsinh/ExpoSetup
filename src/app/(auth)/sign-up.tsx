import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp, useOAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // Using useOAuth
  const { startOAuthFlow: googleOAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: githubOAuth } = useOAuth({ strategy: "oauth_github" });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error("Error signing up:", JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error("Verification not complete", JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error("Error verifying:", JSON.stringify(err, null, 2));
    }
  };

  const onGooglePress = async () => {
    try {
      const { createdSessionId, setActive: setActiveOAuth } = await googleOAuth({
        redirectUrl: Linking.createURL("/", { scheme: "your.app.scheme" }),
      });

      if (createdSessionId) {
        await setActiveOAuth!({ session: createdSessionId });
        router.replace("/");
      } else {
        // optional: handle cases like need to complete sign up or additional steps
      }
    } catch (err) {
      console.error("Google OAuth error:", err);
    }
  };

  const onGithubPress = async () => {
    try {
      const { createdSessionId, setActive: setActiveOAuth } = await githubOAuth({
        redirectUrl: Linking.createURL("/", { scheme: "your.app.scheme" }),
      });

      if (createdSessionId) {
        await setActiveOAuth!({ session: createdSessionId });
        router.replace("/");
      } else {
        // handle fallback
      }
    } catch (err) {
      console.error("GitHub OAuth error:", err);
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 px-6">
        <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Verify your email</Text>
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
            <Text className="text-center text-white font-semibold text-base">Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Sign-up form
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Logo */}
        <View className="items-center mb-6">
          <Text className="text-4xl">🌟</Text>
        </View>

        <Text className="text-center text-2xl font-bold text-gray-900 mb-1">Sign up</Text>
        <Text className="text-center text-gray-600 mb-6">Create your account to get started.</Text>

        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={setEmailAddress}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-base text-gray-900"
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry
          onChangeText={setPassword}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-6 text-base text-gray-900"
        />

        <TouchableOpacity
          onPress={onSignUpPress}
          className="bg-indigo-600 rounded-lg py-3 mb-4"
        >
          <Text className="text-center text-white font-semibold text-base">Continue</Text>
        </TouchableOpacity>

        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="px-2 text-gray-500 text-sm">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <View className="flex-row justify-center space-x-4 mb-4">
          <TouchableOpacity
            onPress={onGooglePress}
            className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2 mr-2"
          >
            <AntDesign name="google" size={20} color="#DB4437" />
            <Text className="ml-2 text-gray-700">Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onGithubPress}
            className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2"
          >
            <AntDesign name="github" size={20} color="#333" />
            <Text className="ml-2 text-gray-700">GitHub</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <Text className="text-gray-700">Already have an account? </Text>
          <Link href="/sign-in">
            <Text className="text-indigo-600 font-semibold">Sign in</Text>
          </Link>
        </View>

        <Text className="text-center text-xs text-gray-400 mt-6">Secured by Clerk</Text>
      </View>
    </View>
  );
}
