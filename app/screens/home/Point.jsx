import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Barcode from '@/src/components/Barcode';
import { router } from 'expo-router';
const Point = ({ user, page = 'homeScreen' }) => {
    console.log(page);
    return (
        <LinearGradient
            colors={['#bdc3c7', '#2c3e50']}
            start={[1, 0]}
            end={[0, 1]}
            style={{
                width: '100%',
                borderRadius: 20,
                paddingVertical: 30,
                paddingHorizontal: 20,
                marginTop: 16,
            }}>
            {page === 'homeScreen' ? (
                <>
                    <View className="flex flex-row items-center justify-between mb-4">
                        <Text className="text-white font-semibold text-lg">{user?.name}</Text>
                        <Pressable
                            className="bg-primary  pt-2 pb-2 pl-5 pr-3 absolute right-[-20px] rounded-tl-full rounded-bl-full"
                            onPress={() => router.push('/screens/redeemPoint/RedeemPointScreen')}>
                            <Text className=" text-white font-semibold text-lg ">
                                {user.points >= 1 ? `Đổi ${user.points} RICE` : 'Hiện chưa có xu'}
                            </Text>
                        </Pressable>
                    </View>
                    <Barcode />
                </>
            ) : (
                <View className="flex flex-row items-center justify-between mb-4">
                    <Text className="text-white font-semibold text-lg">{user?.name}</Text>
                    <Text>Có cái nịt</Text>
                </View>
            )}
        </LinearGradient>
    );
};

export default Point;
