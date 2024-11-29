import { View, Text, ScrollView, Image, Pressable, TextInput } from 'react-native';
import React, { useCallback, useRef } from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import BackButton from '@/src/components/BackButton';
import { useRouter } from 'expo-router';
import useCheckoutPreview from '@/src/features/order/useCheckoutPreview';
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
import SearchInput from '@/src/components/SearchInput';
const OrderConfirm = () => {
    const bottomSheetRef = useRef(null);
    const router = useRouter();
    const { orders, isPending } = useCheckoutPreview();
    const { discounts, isPending: isDiscounting } = useDiscounts();

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    const handleOpen = () => {
        bottomSheetRef.current?.present();
    };

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

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

                    <Pressable
                        className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4"
                        onPress={handleOpen}>
                        <Text className="text-lg text-blue-500 ">Chọn khuyến mãi/đổi bean</Text>

                        <MaterialIcons name="arrow-forward-ios" size={10} color="black" />
                    </Pressable>
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
                        <View>
                            <View className="flex flex-row justify-between items-center ">
                                <ButtonIcon onPress={handleClose}>
                                    <MaterialIcons name="arrow-back-ios" size={20} color="black" />
                                </ButtonIcon>

                                <Text className="text-2xl font-medium">Nhập mã khuyến mãi</Text>
                                <ButtonIcon onPress={handleClose}>
                                    <AntDesign name="close" size={20} color="black" />
                                </ButtonIcon>
                            </View>

                            <View
                                className="flex flex-row  mt-8 
                            ">
                                <TextInput
                                    placeholder="Nhập mã khuyến mãi"
                                    className="flex-1  text-black  bg-white  rounded-l-lg items-center justify-center p-5"
                                />
                                <Pressable className=" bg-primary p-5 rounded-r-lg justify-center items-center ">
                                    <Text className="text-white font-semibold">Áp dụng</Text>
                                </Pressable>
                            </View>
                            <Text className="mt-10 text-xl font-bold">Sẵn sàng sử dụng</Text>
                            <Discounts discounts={discounts} bottomSheetRef={bottomSheetRef} />
                        </View>
                    )}
                </BottomSheetScrollView>
            </CustomBottomSheetModal>
        </ScrollView>
    );
};

export default OrderConfirm;
