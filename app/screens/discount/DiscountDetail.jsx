import { View, Text, Pressable, Clipboard } from 'react-native';
import React from 'react';
import { formatCurrency } from '@/src/helpers/helpers';
import QRCodeUI from '@/src/components/QRCodeUI';
import Toast from 'react-native-toast-message';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ButtonIcon from '@/src/components/ButtonIcon';
import { useLocalSearchParams } from 'expo-router';

const DiscountDetail = ({ discount, handleApplyDiscount, onCloseIn, discountCodeParams }) => {
    const {
        discount_name,
        discount_content,
        discount_code,
        discount_value,
        discount_value_type,
        min_order_value,
        maximum_discount_value,
        max_uses_per_user,
        remainingUses,
        applicable_products,
        days_remaining,
    } = discount.metaData;

    const compareDiscountCode = discountCodeParams === discount_code;

    const handleCopyDiscountCode = () => {
        Clipboard.setString(discount_code);
        Toast.show({
            type: 'success',
            text1: `Mã ${discount_code} đã được sao chép!`,
        });
    };

    return (
        <>
            <View className="flex flex-row justify-between items-center ">
                <ButtonIcon onPress={onCloseIn}>
                    <MaterialIcons name="arrow-back-ios" size={22} color="black" />
                </ButtonIcon>

                <Text className="text-base font-semibold text-text text-center">
                    {' '}
                    HUTECH CANTEEN
                </Text>
                <ButtonIcon onPress={onCloseIn}>
                    <AntDesign name="close" size={22} color="black" />
                </ButtonIcon>
            </View>
            <View className="flex flex-cols items-center">
                <Text
                    className="text-2xl font-semibold text-center my-0 mx-auto mt-4
                ">
                    Giảm tối đa {formatCurrency(maximum_discount_value)} cho đơn từ{' '}
                    {formatCurrency(min_order_value)}
                </Text>

                <View className="mt-10 flex flex-col items-center">
                    <QRCodeUI value={discount_code} />
                    <Text className="mt-4 text-text font-semibold">{discount_code}</Text>
                    <Pressable className="mt-1" onPress={handleCopyDiscountCode}>
                        <Text className="text-blue-500 font-medium text-lg">Sao chép</Text>
                    </Pressable>
                    {compareDiscountCode ? (
                        <Pressable
                            className="mt-8 bg-red-500 py-4  px-8 rounded-full"
                            onPress={() => {
                                handleApplyDiscount(discount_code);
                                onCloseIn();
                            }}>
                            <Text className="text-white text-lg font-semibold">Sử dụng sau</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            className="mt-8 bg-slate-950 py-4  px-8 rounded-full"
                            onPress={() => {
                                handleApplyDiscount(discount_code);
                                onCloseIn();
                            }}>
                            <Text className="text-white text-lg font-semibold">Sử dụng ngay</Text>
                        </Pressable>
                    )}
                </View>
            </View>
            <View className="mt-12 pb-10">
                <View className="flex flex-row justify-between border-y-[1px] border-gray py-4">
                    <Text className="text-lg text-text font-semibold">Tên chương trình:</Text>
                    <Text className="text-lg  font-semibold  text-text">{discount_name}</Text>
                </View>
                <View className="flex flex-row justify-between border-b-[1px] border-gray py-4">
                    <Text className="text-lg text-text font-semibold">Ngày hết hạn:</Text>
                    <Text
                        className={`text-lg  font-semibold ${days_remaining === 1 ? 'text-red-500' : 'text-text'}`}>
                        Hết hạn sau {days_remaining} ngày
                    </Text>
                </View>
                <View className="flex flex-row justify-between border-b-[1px] border-gray py-4">
                    <Text className="text-lg text-text font-semibold">Giảm giá:</Text>
                    <Text className="text-lg  font-semibold  text-text">
                        {discount_value}
                        {discount_value_type && '%'}
                    </Text>
                </View>
                <View className="flex flex-row justify-between border-b-[1px] border-gray py-4">
                    <Text className="text-lg text-text font-semibold">Số lượt còn lại:</Text>
                    <Text className="text-lg  font-semibold  text-text">{remainingUses} lần</Text>
                </View>
                <View className="flex flex-row justify-between border-b-[1px] border-gray py-4">
                    <Text className="text-lg text-text font-semibold">Được sử dụng tối đa:</Text>
                    <Text className="text-lg  font-semibold  text-text">
                        {max_uses_per_user} lần
                    </Text>
                </View>
                <Text className="mt-4 text-lg text-text ">{discount_content}</Text>
            </View>
        </>
    );
};

export default DiscountDetail;
