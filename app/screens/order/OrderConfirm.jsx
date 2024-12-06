import { View, Text, ScrollView, Image, Pressable, Alert, Linking } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import BackButton from '@/src/components/BackButton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useCheckoutPreview from '@/src/features/order/useCheckoutPreview';
import useCheckout from '@/src/features/order/useCheckout';
import Loading from '@/src/components/Loading';
import OrderConfirmItem from './OrderConfirmItem';
import { formatCurrency } from '@/src/helpers/helpers';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ButtonIcon from '@/src/components/ButtonIcon';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import useDiscounts from '@/src/features/discount/useDiscounts';
import SelectDiscount from '../discount/SelectDiscount';
import useDiscount from '@/src/features/discount/useDiscount';
import useOpeningTimesForNextDays from '../../screens/openingHour/useOpeningTimesForNextDays';
import SelectHour from '../openingHour/SelectHour';
import useCurrentPosition from '@/src/features/order/useCurrentPosition';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { theme } from '@/src/constants/theme';
import useToken from '@/src/hooks/useToken';
const OrderConfirm = () => {
    const bottomSheetRefSelectDiscount = useRef(null);
    const bottomSheetRefSelectHour = useRef(null);

    const router = useRouter();
    const token = useToken();
    const { checkout, isCheckouting } = useCheckout();
    const { orders, isPending } = useCheckoutPreview();
    const { discounts, isPending: isDiscounting } = useDiscounts();
    const { discount, isDiscounting: isLoading } = useDiscount();
    const { openingTimesForNextDays, isOpening } = useOpeningTimesForNextDays();
    const { discountCode } = useLocalSearchParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [note, setNote] = useState('');
    const { position, isPositing } = useCurrentPosition();

    const handleOpenSelectDiscount = () => {
        bottomSheetRefSelectDiscount.current?.present();
    };

    const handleOpenSelectHour = () => {
        bottomSheetRefSelectHour.current?.present();
    };

    const renderBackdropSelectDiscount = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    const renderBackdropSelectHour = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    if (isPending) return <Loading />;

    const { totalPrice, totalMinutes, finalPrice, totalDiscount } = orders.metaData;

    const handleTimeSelection = (day, timeValue, timeLabel) => {
        setSelectedDate({ day, timeValue, timeLabel });
        bottomSheetRefSelectHour.current?.close();
    };

    const handleCheckout = () => {
        checkout(
            {
                token,
                note,
                deliveryTime: selectedDate?.timeValue || '',
                discount_code: discountCode,
                userLat: position.latitude,
                userLon: position.longitude,
            },
            {
                onSuccess: (data) => {
                    if (data) {
                        Linking.openURL(data);
                        router.push('/(tabs)/home');
                    }
                },
                onError: () => {
                    Alert.alert('Có lỗi', ' Đã xảy ra lỗi trong quá trình thanh toán');
                },
            },
        );
    };

    const totalProductQuantity = orders.metaData.productCheckout.reduce(
        (acc, cur) => acc + cur.quantity,
        0,
    );

    const handleDayLabel = (day) => {
        switch (day) {
            case 'Today':
                return 'Hôm nay';
            case 'Tomorrow':
                return 'Ngày mai';
            case 'InTwoDays':
                return 'Ngày mốt';
            default:
                return day;
        }
    };
    return (
        <>
            <ScrollView
                className="bg-darkLight "
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}>
                <ScreenWrapper>
                    <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                        <BackButton router={router} />
                        <Text className="my-0 mx-auto text-xl font-semibold">
                            Xác Nhận Đơn Hàng
                        </Text>
                    </View>
                </ScreenWrapper>
                <View className="bg-white p-4 mt-5">
                    <Text className="text-2xl font-medium">Tự đến lấy hàng</Text>
                    <Pressable
                        className="flex flex-row items-center justify-between  border-t-[1px] border-t-gray mt-8 pt-4"
                        onPress={handleOpenSelectHour}>
                        <View>
                            <Text className=" text-lg ">
                                {!selectedDate
                                    ? 'Càng sớm càng tốt'
                                    : handleDayLabel(selectedDate.day)}
                            </Text>
                            <Text className=" text-text font-medium">
                                {!selectedDate ? '5-10 phút' : selectedDate.timeLabel}
                            </Text>
                        </View>

                        <MaterialIcons name="arrow-forward-ios" size={10} color="black" />
                    </Pressable>
                </View>
                <View className="bg-white p-4 mt-5">
                    <Text className="text-2xl font-medium">Sản phẩm đã chọn</Text>
                    {orders.metaData.productCheckout.map((order, index) => (
                        <OrderConfirmItem order={order} key={index} />
                    ))}
                </View>
                <View className="bg-white p-4 mt-5">
                    <Text className="text-2xl font-medium mb-4">Ghi chú</Text>

                    <Input
                        type="inputSmall"
                        placeholder="Thêm ghi chú..."
                        onChange={setNote}
                        value={note}
                    />
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
                                onPress={handleOpenSelectDiscount}>
                                <Text className="text-lg text-blue-500 ">
                                    Chọn khuyến mãi/đổi bean
                                </Text>

                                <MaterialIcons name="arrow-forward-ios" size={10} color="black" />
                            </Pressable>
                        ) : (
                            <Pressable
                                className="flex flex-row items-center justify-between  border-b-[1px] border-b-gray pb-4"
                                onPress={handleOpenSelectDiscount}>
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
                    <Text className="text-2xl font-medium">Phương thức thanh toán</Text>

                    <View className="flex flex-row items-center gap-4  mt-6">
                        <Image
                            source={{
                                uri: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png',
                            }}
                            className="h-10 w-10"
                        />
                        <Text className="text-lg text-text">MOMO</Text>
                    </View>
                </View>
                {/* Modal Select Discount */}
                <CustomBottomSheetModal
                    ref={bottomSheetRefSelectDiscount}
                    renderBackdrop={renderBackdropSelectDiscount}
                    indexSnapPoint={4}
                    bg="#f5f5f5">
                    <BottomSheetScrollView style={{ padding: 20 }}>
                        {isDiscounting ? (
                            <Loading />
                        ) : (
                            <SelectDiscount
                                discounts={discounts}
                                bottomSheetRef={bottomSheetRefSelectDiscount}
                                discount={discount}
                                isLoading={isLoading}
                                discountCodeParams={discountCode}
                            />
                        )}
                    </BottomSheetScrollView>
                </CustomBottomSheetModal>
                {/* Modal Select Hour */}
                <CustomBottomSheetModal
                    ref={bottomSheetRefSelectHour}
                    renderBackdrop={renderBackdropSelectHour}
                    indexSnapPoint={1}
                    bg="#f5f5f5">
                    <BottomSheetScrollView style={{ padding: 20 }}>
                        {isOpening ? (
                            <Loading />
                        ) : (
                            <SelectHour
                                data={openingTimesForNextDays.metaData}
                                onConfirm={handleTimeSelection}
                            />
                        )}
                    </BottomSheetScrollView>
                </CustomBottomSheetModal>
            </ScrollView>
            <View className="absolute bottom-0 right-0 left-0 bg-primary border-t-[1px] border-t-gray pt-2 pb-8 px-6 flex flex-row gap-10 items-center justify-between">
                <View className="flex flex-col items-start">
                    <Text className="text-lg text-white font-medium">
                        Mang đi - {totalProductQuantity} sản phẩm
                    </Text>
                    <Text className="text-lg text-white  font-bold">
                        {' '}
                        {formatCurrency(finalPrice)}
                    </Text>
                </View>
                <Button
                    disabled={isCheckouting}
                    onPress={handleCheckout}
                    title="Thanh Toán"
                    buttonStyle={{
                        flex: 0.7,
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

export default OrderConfirm;
