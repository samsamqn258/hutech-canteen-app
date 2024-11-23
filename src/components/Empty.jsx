import { View, Text } from 'react-native';
import React from 'react';

const Empty = ({ title }) => {
    console.log(title);
    return (
        <View className="flex items-center justify-center h-2/3">
            <Text className="text-lg">{title}</Text>
        </View>
    );
};

export default Empty;
