import React from 'react';
import { View, Text } from 'react-native';

const OpeningHour = ({ day, open, close }) => {
    return (
        <View className="mt-3 bg-white rounded-full flex shadow-sm flex-row items-center justify-between">
            <Text className="p-3 text-lg font-medium flex-1">{day}</Text>
            <View className="bg-gray min-w-0 p-3 rounded-full">
                <Text className="text-base font-medium">
                    {open} am - {close} pm
                </Text>
            </View>
        </View>
    );
};

export default OpeningHour;
