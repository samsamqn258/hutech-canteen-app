import { View, Text, ScrollView, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import BackButton from '@/src/components/BackButton';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import useCarts from '@/src/features/cart/useCarts';
import Loading from '@/src/components/Loading';
import Empty from '@/src/components/Empty';
import CartItem from './CartItem';
import Carts from './Carts';

const CartScreen = () => {
    const router = useRouter();
    const { carts, isPending } = useCarts();

    if (isPending) return <Loading />;

    if (!carts.metaData.cart_products.length)
        return (
            <ScreenWrapper bg="white">
                <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Giỏ Hàng Của Bạn</Text>
                </View>
                <Empty title="Bạn chưa có sản phẩm nào trong giỏ hàng." />
            </ScreenWrapper>
        );

    return (
        <ScrollView className="bg-body" showsVerticalScrollIndicator={false}>
            <ScreenWrapper>
                <View className="flex flex-row items-center px-5 border-b-[1px] pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Giỏ Hàng Của Bạn</Text>
                </View>
                <Carts carts={carts} />
            </ScreenWrapper>
        </ScrollView>
    );
};

export default CartScreen;
