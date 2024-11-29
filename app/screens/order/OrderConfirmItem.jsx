import { View, Text, Image } from 'react-native';
import React from 'react';

import { formatCurrency } from '@/src/helpers/helpers';

const OrderConfirmItem = ({ order }) => {
    const {
        product_thumb: productThumb,
        product_id,
        product_name: productName,
        extra: sideDishes,
        quantity,
        totalPrice,
    } = order;
    return (
        <View className="flex flex-row gap-4 items-center mt-6 justify-between">
            <View className="flex flex-row gap-4 items-center">
                <Image source={{ uri: productThumb }} className="w-20 h-20" />
                <View>
                    <Text className="text-base font-medium">
                        x{quantity + ' '}
                        {productName}
                    </Text>
                    {sideDishes.map((sideDish) => (
                        <View key={sideDish.sideDish_id}>
                            <Text className="text-sm text-textLight">{sideDish.sideDish_name}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <Text className="text-text text-sm font-semibold">{formatCurrency(totalPrice)}</Text>
        </View>
    );
};

export default OrderConfirmItem;
