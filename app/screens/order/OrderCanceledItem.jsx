import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { formatCurrency, formattedTime } from '@/src/helpers/helpers';
import { router } from 'expo-router';

const OrderCanceledItem = ({ order, bottomSheetRef }) => {
    const handleClick = () => {
        router.setParams({ orderID: order._id });
        bottomSheetRef.current?.present();
    };
    return (
        <Pressable
            className="flex flex-row gap-4 bg-white py-4  px-2 rounded-md items-center justify-between mt-2"
            onPress={handleClick}>
            <View className="flex flex-row gap-4 items-center">
                <View className="w-16 h-16 bg-secondary flex items-center justify-center rounded-full">
                    <Image
                        source={require('@/assets/images/z6105385135240_8d5fd936e38173e2b1f0cb53c08f5901.jpg')}
                        className="w-12 h-12 object-cover rounded-full"
                    />
                </View>
                <View>
                    <Text className="text-lg font-semibold w-52">
                        {order.order_product.map((product) => product.product_name).join(',')}
                    </Text>
                    <Text className=" text-textLight mt-2">
                        {formattedTime(order.estimated_delivery_time)}
                    </Text>
                </View>
            </View>
            <Text className="text-text font-semibold text-lg">
                {formatCurrency(order.order_checkout.finalPrice)}
            </Text>
        </Pressable>
    );
};

export default OrderCanceledItem;
