import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
const Point = ({ user }) => {
    return (
        <LinearGradient
            colors={['#bdc3c7', '#2c3e50']}
            start={[1, 0]}
            end={[0, 1]}
            style={{
                flex: 1,
                width: '100%',
                borderRadius: 20,
                paddingTop: 40,
                paddingHorizontal: 20,
                marginTop: 16,
            }}>
            <View className="flex flex-row items-center justify-between">
                <Text className="text-white font-semibold text-lg">{user?.name}</Text>
                <Text className="bg-secondary pt-2 pb-2 pl-5 pr-3 absolute right-[-20px] text-dark font-semibold text-lg rounded-tl-full rounded-bl-full">
                    Hiện chưa có xu
                </Text>
            </View>
            <View className="mt-8 bg-white rounded-md p-3">
                <Text className="text-dark font-semibold text-lg text-center">
                    Hãy sử dụng nhiều sản phẩm để có thể đạt nhiều xu
                </Text>
            </View>
        </LinearGradient>
    );
};

export default Point;
