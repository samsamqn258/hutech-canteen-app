import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import BackButton from '@/src/components/BackButton';
import { useRouter } from 'expo-router';
import useCheckoutPreview from '@/src/features/order/useCheckoutPreview';
import Loading from '@/src/components/Loading';
import OrderConfirmItem from './OrderConfirmItem';
import { formatCurrency } from '@/src/helpers/helpers';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ButtonIcon from '@/src/components/ButtonIcon';
const OrderConfirm = () => {
    const router = useRouter();
    const { orders, isPending } = useCheckoutPreview();

    if (isPending) return <Loading />;

    const { totalPrice, totalMinutes, finalPrice } = orders.metaData;

    return (
        <ScrollView className="bg-darkLight" showsVerticalScrollIndicator={false}>
            <ScreenWrapper>
                <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Xác Nhận Đơn Hàng</Text>
                </View>
            </ScreenWrapper>
            <View className="bg-white p-4 mt-5">
                <Text className="text-2xl font-medium">Sản phẩm đã chọn</Text>
                {orders.metaData.productCheckout.map((order, index) => (
                    <OrderConfirmItem order={order} key={index} />
                ))}
            </View>
            <View className="bg-white p-4 mt-5">
                <Text className="text-2xl font-medium">Tổng cộng</Text>
                <View className="flex flex-col gap-4 mt-6">
                    <View className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4">
                        <Text className="text-lg text-text ">Thành tiền</Text>
                        <Text className="text-lg text-text ">{formatCurrency(totalPrice)}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4">
                        <Text className="text-lg text-text ">Thời gian dự kiến</Text>
                        <Text className="text-lg text-text ">{totalMinutes} phút</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4">
                        <Text className="text-lg text-blue-500 ">Chọn khuyến mãi/đổi bean</Text>
                        <ButtonIcon>
                            <MaterialIcons name="arrow-forward-ios" size={10} color="black" />
                        </ButtonIcon>
                    </View>
                    <View className="flex flex-row items-center justify-between ">
                        <Text className="text-lg font-bold ">Số tiền thanh toán</Text>
                        <Text className="text-lg font-bold">{formatCurrency(finalPrice)}</Text>
                    </View>
                </View>
            </View>
            <View className="bg-white p-4 mt-5">
                <Text className="text-2xl font-medium">Thanh toán</Text>
                <View className="flex flex-row items-center justify-between mt-6">
                    <View className="flex flex-row items-center gap-4">
                        <Image
                            source={{
                                uri: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png',
                            }}
                            className="h-10 w-10"
                        />
                        <Text className="text-lg text-text">MOMO</Text>
                    </View>
                    <ButtonIcon>
                        <MaterialIcons name="arrow-forward-ios" size={10} color="black" />
                    </ButtonIcon>
                </View>
            </View>
        </ScrollView>
    );
};

export default OrderConfirm;
