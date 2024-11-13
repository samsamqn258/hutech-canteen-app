import { View, Text } from 'react-native';
import React from 'react';

const Error = ({ error }) => {
    return (
        <Text className="text-rose-600 text-base font-semibold mt-1 ml-4">
            {error}
        </Text>
    );
};

export default Error;
