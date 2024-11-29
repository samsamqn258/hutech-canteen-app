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
import Button from '@/src/components/Button';
import { formatCurrency } from '@/src/helpers/helpers';
import { theme } from '@/src/constants/theme';

const CartScreen = () => {
    const router = useRouter();
    const { carts, isPending } = useCarts();

    if (isPending) return <Loading />;

    if (!carts.metaData)
        return (
            <ScreenWrapper bg="white">
                <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Giỏ Hàng Của Bạn</Text>
                </View>
                <Empty title="Bạn chưa có sản phẩm nào trong giỏ hàng." />
            </ScreenWrapper>
        );

    const totalProductQuantity = carts.metaData.cart_products.reduce(
        (acc, cur) => acc + cur.quantity,
        0,
    );

    const totalProductPrice = carts.metaData.cart_products.reduce(
        (acc, cur) => acc + cur.totalPrice,
        0,
    );
    return (
        <>
            <ScrollView
                className="bg-darkLight"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 100,
                }}>
                <ScreenWrapper>
                    <View className="flex flex-row items-center px-5 border-b-[1px] pb-3 mx-[-20px] border-gray ">
                        <BackButton router={router} />
                        <Text className="my-0 mx-auto text-xl font-semibold">Giỏ Hàng Của Bạn</Text>
                    </View>
                    <Carts carts={carts} />
                </ScreenWrapper>
            </ScrollView>
            <View className="absolute bottom-0 right-0 left-0 bg-primary border-t-[1px] border-t-gray pt-2 pb-8 px-6 flex flex-row gap-10 items-center justify-between">
                <View className="flex flex-col items-start">
                    <Text className="text-lg text-white font-medium">
                        Tổng - {totalProductQuantity} sản phẩm
                    </Text>
                    <Text className="text-lg text-white  font-bold">
                        {' '}
                        {formatCurrency(totalProductPrice)}
                    </Text>
                </View>
                <Button
                    onPress={() => router.push('/screens/order/OrderConfirm')}
                    title="Xác Nhận"
                    buttonStyle={{
                        flex: 0.5,
                        backgroundColor: 'white',
                        borderRadius: 999,
                        height: 40,
                    }}
                    textStyle={{ color: theme.colors.primary, fontSize: 15 }}
                />
            </View>
        </>
    );
};

export default CartScreen;
