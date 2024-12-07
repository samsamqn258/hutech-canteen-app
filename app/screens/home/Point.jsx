import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Barcode from '@/src/components/Barcode';
import { router } from 'expo-router';
const Point = ({ user, page = 'homeScreen' }) => {
    console.log(user.user.points);
    const getRankLevel = (points) => {
        if (points >= 20000) return 'diamond';
        if (points >= 10000) return 'platinum';
        if (points >= 5000) return 'gold';
        if (points >= 2000) return 'silver';
        if (points >= 500) return 'bronze';
        return 'newbie';
    };

    const getRankDetails = (points) => {
        const rankLevel = getRankLevel(points);
        switch (rankLevel) {
            case 'diamond':
                return { title: 'Kim cương', colors: ['#8fd3f4', '#84fab0'], next: null };
            case 'platinum':
                return { title: 'Bạch kim', colors: ['#a8c0ff', '#3f2b96'], next: 20000 };
            case 'gold':
                return { title: 'Vàng', colors: ['#f9d423', '#ff4e50'], next: 10000 };
            case 'silver':
                return { title: 'Bạc', colors: ['#bdc3c7', '#2c3e50'], next: 5000 };
            case 'bronze':
                return { title: 'Đồng', colors: ['#d4a373', '#805e30'], next: 2000 };
            default:
                return { title: 'Mới', colors: ['#e0eafc', '#b4c6e7'], next: 500 };
        }
    };

    const { title, colors, next } = getRankDetails(user.user.points || 0);

    const currentPoints = user.user.points || 0;
    const previousThreshold = next ? next / 2 : 0; // Điểm tối thiểu cho hạng hiện tại
    const progressPercentage = next
        ? ((currentPoints - previousThreshold) / (next - previousThreshold)) * 100
        : 100;

    return (
        <LinearGradient
            colors={colors}
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
                        <View>
                            <Text className="text-white font-semibold text-lg">
                                {user.user.name}
                            </Text>
                            <Text className="text-white font-bold text-2xl">{title}</Text>
                        </View>
                        <Pressable
                            className="bg-white  pt-2 pb-2 pl-5 pr-3 absolute right-[-20px] rounded-tl-full rounded-bl-full"
                            onPress={() => router.push('/screens/redeemPoint/RedeemPointScreen')}>
                            <Text className=" text-black font-semibold text-lg ">
                                {user.user.points >= 1
                                    ? `Đổi ${user.user.points} RICE`
                                    : 'Hiện chưa có xu'}
                            </Text>
                        </Pressable>
                    </View>
                    <Barcode />
                </>
            ) : (
                <View>
                    <View className="flex flex-row items-center justify-between mb-4">
                        <Text className="text-white font-bold text-2xl">{title}</Text>
                        <Text className="text-white font-semibold text-xl">
                            {user.user.points} RICE
                        </Text>
                    </View>
                    {/* Thanh trượt */}
                    {next && (
                        <View className="mt-4">
                            <View className="h-3 w-full bg-gray bg-opacity-60 rounded-md overflow-hidden">
                                <View
                                    className="h-full bg-primary"
                                    style={{
                                        width: `${progressPercentage}%`,
                                    }}
                                />
                            </View>
                            <Text className="text-white  text-center mt-4 w-80 mx-auto text-base">
                                Còn {next - currentPoints} RICE nữa bạn sẽ được thăng hạng. Hãy dùng
                                RICE này để đổi Ưu đãi nhé.
                            </Text>
                        </View>
                    )}
                </View>
            )}
        </LinearGradient>
    );
};

export default Point;
