import { useSignIn } from "@clerk/clerk-expo";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // Clerk OAuth hooks
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startGithubOAuth } = useOAuth({ strategy: "oauth_github" });

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

  const onGooglePress = async () => {
    try {
      const { createdSessionId, setActive: setOAuthActive } = await startGoogleOAuth();
      if (createdSessionId) {
        await setOAuthActive!({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error("Google OAuth error", err);
    }
  };

  const onGithubPress = async () => {
    try {
      const { createdSessionId, setActive: setOAuthActive } = await startGithubOAuth();
      if (createdSessionId) {
        await setOAuthActive!({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error("GitHub OAuth error", err);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <Text className="text-center text-2xl font-bold text-gray-900 mb-6">
          Sign in to your account
        </Text>

        {/* Social buttons */}
        <View className="flex-row justify-center mb-6">
          <TouchableOpacity
            onPress={onGooglePress}
            className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2 mr-3"
          >
            <AntDesign name="google" size={20} />
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

        {/* OR separator */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="px-2 text-gray-500">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Email + Password */}
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
          secureTextEntry={true}
          onChangeText={setPassword}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-6 text-base text-gray-900"
        />

        <TouchableOpacity
          onPress={onSignInPress}
          className="bg-indigo-600 rounded-lg py-3 mb-4"
        >
          <Text className="text-center text-white font-semibold text-base">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
