import { useUser } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import { api } from "../../../convex/_generated/api";

export default function ConvexExample() {
  const { user } = useUser();
  const [message, setMessage] = useState("");

  // Get messages from Convex
  const messages = useQuery(api.messages.getMessages);

  // Send message mutation
  const sendMessage = useMutation(api.messages.sendMessage);

  const handleSend = async () => {
    if (message.trim() === "" || !user) return;

    await sendMessage({
      body: message,
      userId: user.id,
      userName: user.fullName || user.emailAddresses[0].emailAddress,
    });

    setMessage("");
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-900 mb-4">Convex Chat Example</Text>

      <View className="flex-row mb-4">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg p-3 bg-white"
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          className="ml-2 bg-indigo-600 rounded-lg px-4 justify-center"
          onPress={handleSend}
        >
          <Text className="text-white font-semibold">Send</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-white rounded-lg p-4">
        {messages?.map((msg) => (
          <View key={msg._id.toString()} className="mb-3 p-3 bg-gray-50 rounded-lg">
            <Text className="font-semibold text-gray-800">{msg.userName}</Text>
            <Text className="text-gray-600">{msg.body}</Text>
            <Text className="text-xs text-gray-400 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        ))}

        {messages?.length === 0 && (
          <Text className="text-gray-500 text-center py-4">
            No messages yet. Be the first to send one!
          </Text>
        )}
      </ScrollView>
    </View>
  );
}