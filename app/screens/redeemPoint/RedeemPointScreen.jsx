import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import BackButton from '@/src/components/BackButton';
import { useRouter } from 'expo-router';
import useProducts from '../product/useProducts';
import useUser from '@/src/features/auth/useUser';

import Loading from '@/src/components/Loading';
import RedeemPointItem from './RedeemPointItem';
const RedeemPointScreen = () => {
    const router = useRouter();
    const { products, isPending: isProductLoading } = useProducts();
    const { user, isPending: isUserLoading } = useUser();

    if (isProductLoading || isUserLoading) return <Loading />;

    return (
        <ScrollView>
            <ScreenWrapper bg="white">
                <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Đổi Rice</Text>
                </View>
            </ScreenWrapper>

            <View className="bg-white p-4 flex flex-row items-center gap-4">
                <Image
                    source={require('@/assets/images/pngtree-rice-grain-food-png-image_11484964.png')}
                    className="w-16 h-16 
                    "
                />
                <View>
                    <Text className="text-base font-bold">Số rice hiện tại của bạn</Text>
                    <View className="flex flex-row items-center">
                        <Text className="text-green-500 font-semibold text-lg">
                            {user.user.points}
                        </Text>
                        <Text className="text-sm text-textLight"> Rice</Text>
                    </View>
                </View>
            </View>
            <View className="mt-4 px-4">
                <Text className="text-xl font-bold">Nhanh tay đổi ngay điểm tích lũy!</Text>
                <View className="flex flex-row flex-wrap gap-4">
                    {products.metaData.map((product) => (
                        <RedeemPointItem product={product} key={product._id} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default RedeemPointScreen;
