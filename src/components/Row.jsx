import { View, Text } from 'react-native';
import React from 'react';

const Row = ({ children }) => {
    return <View className="flex gap-2 flex-row items-center justify-center">{children}</View>;
};

export default Row;
