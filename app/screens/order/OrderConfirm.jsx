import { View, Text, ScrollView, Image, Pressable, TextInput } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import BackButton from '@/src/components/BackButton';
import { useRouter } from 'expo-router';
import useCheckoutPreview from '@/src/features/order/useCheckoutPreview';
import useCheckoutUseDiscount from '@/src/features/order/useCheckoutUseDiscount';
import Loading from '@/src/components/Loading';
import OrderConfirmItem from './OrderConfirmItem';
import { formatCurrency } from '@/src/helpers/helpers';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ButtonIcon from '@/src/components/ButtonIcon';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import useDiscounts from '@/src/features/discount/useDiscounts';
import Discounts from '../discount/Discounts';
import AntDesign from '@expo/vector-icons/AntDesign';
import SelectDiscount from '../discount/SelectDiscount';
import useDiscount from '@/src/features/discount/useDiscount';
const OrderConfirm = () => {
    const bottomSheetRef = useRef(null);
    const router = useRouter();
    const { orders, isPending } = useCheckoutPreview();
    const { discounts, isPending: isDiscounting } = useDiscounts();
    const { discount, isDiscounting: isLoading } = useDiscount();
    const handleOpen = () => {
        bottomSheetRef.current?.present();
    };

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );
    console.log(orders);
    if (isPending) return <Loading />;

    const { totalPrice, totalMinutes, finalPrice, totalDiscount } = orders.metaData;

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

                    {totalDiscount === 0 ? (
                        <Pressable
                            className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4"
                            onPress={handleOpen}>
                            <Text className="text-lg text-blue-500 ">Chọn khuyến mãi/đổi bean</Text>

                            <MaterialIcons name="arrow-forward-ios" size={10} color="black" />
                        </Pressable>
                    ) : (
                        <Pressable
                            className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4"
                            onPress={handleOpen}>
                            <Text className="text-lg text-blue-500 ">Khuyến mãi</Text>

                            <Text>-{formatCurrency(totalDiscount)}</Text>
                        </Pressable>
                    )}

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
            <CustomBottomSheetModal
                ref={bottomSheetRef}
                renderBackdrop={renderBackdrop}
                indexSnapPoint={4}
                bg="#f5f5f5">
                <BottomSheetScrollView style={{ padding: 20 }}>
                    {isDiscounting ? (
                        <Loading />
                    ) : (
                        <SelectDiscount
                            discounts={discounts}
                            bottomSheetRef={bottomSheetRef}
                            discount={discount}
                            isLoading={isLoading}
                        />
                    )}
                </BottomSheetScrollView>
            </CustomBottomSheetModal>
        </ScrollView>
    );
};

export default OrderConfirm;
