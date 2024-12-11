import { View, Text, Pressable } from 'react-native';
import React from 'react';
import ButtonIcon from '@/src/components/ButtonIcon';
import Feather from '@expo/vector-icons/Feather';
import QRCodeUI from '@/src/components/QRCodeUI';
import { formattedTime } from '@/src/helpers/helpers';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';

const NotRateItem = ({ rate }) => {
    const router = useRouter();
    const { _id, order_checkout, order_product, order_status, order_trackingNumber } = rate;

    const { finalPrice } = order_checkout;

    const handleRateOpen = () => {
        router.push({
            pathname: '/screens/review/[id]',
            params: {
                reviewID: _id,
                finalPrice,
                order_status,
                order_trackingNumber,
            },
        });
    };

    return (
        <View
            className=" 
            p-4 mt-4 bg-white flex items-start flex-row justify-between w-full">
            <View className="flex flex-col gap-2">
                {order_product.map((product) => {
                    return (
                        <View key={product.product_id}>
                            <Text className="text-base font-semibold">
                                x{product.quantity}
                                {' ' + product.product_name}
                            </Text>
                            {product.extra.map((extra) => (
                                <View key={extra.sideDish_id}>
                                    <Text className="text-sm text-text font-medium">
                                        {extra.sideDish_name}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    );
                })}
            </View>

            <Pressable
                className="bg-primary p-4 flex items-center rounded-lg w-28"
                onPress={handleRateOpen}>
                <Text className="text-lg text-white font-semibold">Đánh giá</Text>
            </Pressable>
        </View>
    );
};

export default NotRateItem;
