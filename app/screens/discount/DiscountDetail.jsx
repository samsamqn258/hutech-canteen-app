import { View, Text, Pressable, Clipboard } from 'react-native';
import React from 'react';
import { formatCurrency } from '@/src/helpers/helpers';
import QRCodeUI from '@/src/components/QRCodeUI';
import Toast from 'react-native-toast-message';

const DiscountDetail = ({ discount }) => {
    const {
        discount_name,
        discount_content,
        discount_code,
        discount_value,
        discount_value_type,
        min_order_value,
        maximum_discount_value,
        max_uses_per_user,
        applicable_products,
        days_remaining,
    } = discount.metaData;

    const handleCopyDiscountCode = () => {
        Clipboard.setString(discount_code);
        Toast.show({
            type: 'success',
            text1: `Mã ${discount_code} đã được sao chép!`,
        });
    };
    return (
        <View className="flex flex-cols items-center">
            <Text className="text-base font-semibold text-text text-center">HUTECH CANTEEN</Text>
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
            </View>
        </View>
    );
};

export default DiscountDetail;
