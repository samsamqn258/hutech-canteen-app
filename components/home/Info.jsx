import { View, Text } from 'react-native';
import React from 'react';

const Info = ({ user }) => {
    return (
        <Text className="text-dark font-semibold text-lg">
            {user?.name} ơi, Chào buổi sáng nhé!
        </Text>
    );
};

export default Info;
