import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useCallback, useRef } from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { theme } from '@/src/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Barcode from '@/src/components/Barcode';
import useDiscounts from '@/src/features/discount/useDiscounts';
import useDiscount from '@/src/features/discount/useDiscount';

import Loading from '@/src/components/Loading';
import Discounts from '../screens/discount/Discounts';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DiscountDetail from '../screens/discount/DiscountDetail';
import { router } from 'expo-router';
import useUser from '@/src/features/auth/useUser';
const Discount = () => {
    const bottomSheetRef = useRef(null);
    const { discounts, isPending } = useDiscounts();
    const { discount, isDiscounting } = useDiscount();
    const { user, isPending: isUserLoading } = useUser();

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    if (isPending || isUserLoading) return <Loading />;

    console.log(discounts, user);
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
                return { title: 'Kim cương', colors: ['#8fd3f4', '#84fab0'] };
            case 'platinum':
                return { title: 'Bạch kim', colors: ['#a8c0ff', '#3f2b96'] };
            case 'gold':
                return { title: 'Vàng', colors: ['#f9d423', '#ff4e50'] };
            case 'silver':
                return { title: 'Bạc', colors: ['#bdc3c7', '#2c3e50'] };
            case 'bronze':
                return { title: 'Đồng', colors: ['#d4a373', '#805e30'] };
            default:
                return { title: 'Mới', colors: ['#e0eafc', '#b4c6e7'] };
        }
    };

    const { title, colors } = getRankDetails(user.user.points || 0);
    return (
        <ScrollView className="bg-darkLight">
            <LinearGradient
                colors={colors}
                start={[1, 0]}
                end={[0, 1]}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,

                    width: '100%',

                    paddingTop: 50,
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                }}>
                <Text className="text-white font-semibold text-2xl">Ưu đãi</Text>
                <View className="flex flex-row  justify-between mt-4 items-start">
                    <View>
                        <Text className="text-white font-bold text-4xl">{title}</Text>
                        <Text className="mt-1 font-bold text-white">{user.user.points} RICE</Text>
                    </View>
                    <Pressable className="px-3 py-2 border-primary rounded-full bg-white flex flex-row gap-1 items-center">
                        <MaterialIcons name="discount" size={20} color={theme.colors.primary} />
                        <Text className="font-semibold text-primary">Voucher của tôi</Text>
                    </Pressable>
                </View>
                <Barcode />
            </LinearGradient>

            <ScreenWrapper>
                <View className="mt-80">
                    <View className=" flex-row flex-wrap gap-4">
                        <View className="flex-1 gap-4">
                            <Pressable
                                className="bg-white rounded-lg p-4"
                                onPress={() => router.push('/screens/ranking/RankingScreen')}>
                                <MaterialCommunityIcons
                                    name="crown-outline"
                                    size={22}
                                    color="#f7b33a"
                                />
                                <Text className="text-text font-bold text-lg mt-2">
                                    Hạng thành viên
                                </Text>
                            </Pressable>
                            <Pressable
                                className="bg-white rounded-lg p-4"
                                onPress={() =>
                                    router.push('/screens/redeemPoint/RedeemPointHistory')
                                }>
                                <FontAwesome
                                    name="exchange"
                                    size={22}
                                    color={theme.colors.primary}
                                />

                                <Text className="text-text font-bold text-lg mt-2">
                                    Lịch sử RICE
                                </Text>
                            </Pressable>
                        </View>
                        <View className="flex-1 gap-4">
                            <Pressable
                                onPress={() =>
                                    router.push('/screens/redeemPoint/RedeemPointScreen')
                                }
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
                    <View className="mt-8">
                        <Text className="text-2xl font-semibold">Phiếu ưu đãi của bạn</Text>
                        <Discounts discounts={discounts} bottomSheetRef={bottomSheetRef} />
                    </View>
                    <CustomBottomSheetModal
                        ref={bottomSheetRef}
                        renderBackdrop={renderBackdrop}
                        indexSnapPoint={2}>
                        <BottomSheetScrollView style={{ padding: 20 }}>
                            {isDiscounting ? (
                                <Loading />
                            ) : (
                                <DiscountDetail discount={discount} onCloseIn={handleClose} />
                            )}
                        </BottomSheetScrollView>
                    </CustomBottomSheetModal>
                </View>
            </ScreenWrapper>
        </ScrollView>
    );
};

export default Discount;
