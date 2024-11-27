import { View, Text, ScrollView, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import BackButton from '@/src/components/BackButton';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import useCarts from '@/src/features/cart/useCarts';
import Loading from '@/src/components/Loading';
import Empty from '@/src/components/Empty';
import CartItem from './CartItem';

const CartScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
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

    return (
        <ScrollView className="bg-body" showsVerticalScrollIndicator={false}>
            <ScreenWrapper>
                <Modal
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View className="flex w-40 h-40 justify-center items-center bg-red-500">
                        <Text>Hello World!</Text>
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <Text>Hide Modal</Text>
                        </Pressable>
                    </View>
                </Modal>
                <View className="flex flex-row items-center px-5 border-b-[1px] pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Giỏ Hàng Của Bạn</Text>
                </View>
                <View className="pt-4 flex flex-col gap-4">
                    {carts.metaData.cart_products.map((cart, index) => {
                        return (
                            <CartItem key={index} cart={cart} setModalVisible={setModalVisible} />
                        );
                    })}
                </View>
            </ScreenWrapper>
        </ScrollView>
    );
};

export default CartScreen;
