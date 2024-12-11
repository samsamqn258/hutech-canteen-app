import { View, Text, Pressable } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { theme } from '@/src/constants/theme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '@/src/features/auth/authSlice';
const BodyOther = () => {
    const dispatch = useDispatch();

    return (
        <View className="mt-4">
            <View className="mt-6">
                <Text className="text-xl font-semibold">Tiện ích</Text>
                <View className=" flex-row flex-wrap gap-4 mt-4">
                    <View className="flex-1 gap-4">
                        <Pressable
                            className="bg-white rounded-lg p-4"
                            onPress={() => router.push('/(tabs)/order')}>
                            <FontAwesome name="history" size={24} color="#f7b33a" />
                            <Text className="text-text font-bold text-lg mt-2">
                                Lịch sử đơn hàng
                            </Text>
                        </Pressable>
                        <Pressable
                            className="bg-white rounded-lg p-4"
                            onPress={() => router.push('/screens/redeemPoint/RedeemPointHistory')}>
                            <FontAwesome6 name="file-shield" size={22} color="#c6a2f5" />

                            <Text className="text-text font-bold text-lg mt-2">
                                Điều khoản MOMO
                            </Text>
                        </Pressable>
                    </View>
                    <View className="flex-1 gap-4">
                        <Pressable
                            onPress={() => router.push('/screens/redeemPoint/RedeemPointScreen')}
                            className="bg-white rounded-lg p-4 ">
                            <SimpleLineIcons
                                name="present"
                                size={22}
                                color={theme.colors.primary}
                            />
                            <Text className="text-text font-bold text-lg mt-2">Đổi Rice</Text>
                        </Pressable>
                        <View className="bg-white rounded-lg p-4 ">
                            <MaterialCommunityIcons
                                name="shield-account-outline"
                                size={22}
                                color="#309ee9"
                            />
                            <Text className="text-text font-bold text-lg mt-2">
                                Quyển lợi của bạn
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="mt-6">
                <Text className="text-xl font-semibold">Hỗ trợ</Text>
                <View className="mt-4 bg-white py-4 pl-4 rounded-lg">
                    <Pressable
                        className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4"
                        onPress={() => router.push('/screens/review/RateHistory')}>
                        <View className="flex flex-row gap-3 items-center">
                            <AntDesign name="staro" size={18} color="black" />
                            <Text className="text-lg text-text font-medium ">
                                Đánh giá đơn hàng
                            </Text>
                        </View>

                        <View className="mr-4">
                            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
                        </View>
                    </Pressable>
                    <Pressable
                        className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4 mt-4"
                        onPress={() => router.push('/screens/favourite/FavouriteScreen')}>
                        <View className="flex flex-row gap-3 items-center">
                            <AntDesign name="hearto" size={18} color="black" />
                            <Text className="text-lg text-text font-medium ">
                                Sản phẩm yêu thích
                            </Text>
                        </View>

                        <View className="mr-4">
                            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
                        </View>
                    </Pressable>

                    <Pressable className="flex flex-row items-center justify-between   border-b-gray  mt-4">
                        <View className="flex flex-row gap-3 items-center">
                            <Feather name="message-square" size={18} color="black" />
                            <Text className="text-lg text-text font-medium ">Liên hệ và góp ý</Text>
                        </View>

                        <View className="mr-4">
                            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
                        </View>
                    </Pressable>
                </View>
            </View>

            <View className="mt-6">
                <Text className="text-xl font-semibold">Tài khoản</Text>
                <View className="mt-4 bg-white py-4 pl-4 rounded-lg">
                    <Pressable
                        className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4"
                        onPress={() => router.push('/screens/user/UpdateUser')}>
                        <View className="flex flex-row gap-3 items-center">
                            <AntDesign name="user" size={18} color="black" />
                            <Text className="text-lg text-text font-medium ">
                                Thông tin cá nhân
                            </Text>
                        </View>

                        <View className="mr-4">
                            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
                        </View>
                    </Pressable>
                    <Pressable className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4 mt-4">
                        <View className="flex flex-row gap-3 items-center">
                            <Feather name="settings" size={18} color="black" />
                            <Text className="text-lg text-text font-medium ">Cài đặt</Text>
                        </View>

                        <View className="mr-4">
                            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
                        </View>
                    </Pressable>

                    <Pressable
                        className="flex flex-row items-center justify-between   border-b-gray  mt-4"
                        onPress={() => {
                            router.push('/screens/auth/welcome');
                            dispatch(logoutUserAction());
                        }}>
                        <View className="flex flex-row gap-3 items-center">
                            <Feather name="log-out" size={18} color="black" />
                            <Text className="text-lg text-text font-medium ">Đăng xuất</Text>
                        </View>

                        <View className="mr-4">
                            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default BodyOther;
