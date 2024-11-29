import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { formatCurrency } from '@/src/helpers/helpers';
import { router } from 'expo-router';

const DiscountItem = ({ discount, bottomSheetRef }) => {
    const {
        _id: discountID,
        discount_image,
        maximum_discount_value,
        min_order_value,
        message,
        discount_value,
        discount_value_type,
        remainingUses,
    } = discount;

    const handlePress = () => {
        router.setParams({ discountID });
        bottomSheetRef.current?.present();
    };
    return (
        <Pressable
            className="bg-white p-4 rounded-lg relative flex flex-row gap-12"
            onPress={handlePress}>
            <View className="w-4 h-4 top-[-8px] left-36 rounded-full bg-darkLight absolute"></View>
            <View className="w-2 h-2 top-[10px] left-[129.5px] rounded-full bg-darkLight absolute"></View>
            <View className="w-2 h-2 top-[22px] left-[129.5px] rounded-full bg-darkLight absolute"></View>
            <View className="w-2 h-2 top-[34px] left-[129.5px] rounded-full bg-darkLight absolute"></View>
            <View className="w-2 h-2 top-[46px] left-[129.5px] rounded-full bg-darkLight absolute"></View>
            <View className="w-2 h-2 top-[58px] left-[129.5px] rounded-full bg-darkLight absolute"></View>
            <View className="w-2 h-2 top-[60px] left-[129.5px] rounded-full bg-darkLight absolute"></View>
            <View className="w-2 h-2 top-[72px] left-[129.5px] rounded-full bg-darkLight absolute"></View>
            <View className="w-2 h-2 top-[84px] left-[129.5px] rounded-full bg-darkLight absolute"></View>
            <View className="w-2 h-2 top-[96px] left-[129.5px] rounded-full bg-darkLight absolute"></View>
            <View className="w-2 h-2 top-[108px] left-[129.5px] rounded-full bg-darkLight absolute"></View>
            <View className="w-4 h-4 bottom-[-8px] left-36 rounded-full bg-darkLight absolute"></View>

            <View className="w-28 h-28 bg-secondary flex items-center justify-center rounded-md">
                <Image source={{ uri: discount_image }} className="h-14 w-20 object-cover" />
            </View>
            <View className="flex flex-col justify-between">
                <Text className="w-52 text-base text-text  font-medium">
                    Giảm {discount_value}
                    {discount_value_type && '%'} Giảm tối đa{' '}
                    {formatCurrency(maximum_discount_value)} cho đơn từ{' '}
                    {formatCurrency(min_order_value)}
                </Text>
                <Text className="text-text text-lg font-medium">{message}</Text>
            </View>
            <View className="absolute border-t-transparent border-x-transparent  border-4 border-primary top-7 rotate-90 right-[-8px]"></View>
            <View className="absolute w-12 h-6 rounded-l-full bg-secondary top-2 right-[-4px] flex items-center justify-center">
                <Text className="text-primary text-sm font-bold">X {remainingUses}</Text>
            </View>
        </Pressable>
    );
};

export default DiscountItem;
