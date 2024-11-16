import { View, Text } from "react-native";
import React from "react";

const Empty = ({ value }) => {
  return (
    <View className="flex items-start">
      <Text className="text-lg font-medium">{value}</Text>
    </View>
  );
};

export default Empty;
