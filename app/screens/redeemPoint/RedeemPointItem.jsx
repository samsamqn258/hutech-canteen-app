import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import useToken from '@/src/hooks/useToken';
import useCreateRedeemPoint from '@/src/features/redeemPoint/useCreateRedeemPoint';

const RedeemPointItem = ({ product }) => {
    const token = useToken();
    const { createRedeemPoint, isCreating } = useCreateRedeemPoint();

    const { product_thumb, product_name, required_points, _id: productID } = product;

    const handlerCreateRedeemPoint = () => {
        createRedeemPoint({
            token,
            productID,
        });
    };
    return (
        <Pressable
            className="mt-4 bg-white w-[48%] rounded-b-md shadow-sm"
            onPress={handlerCreateRedeemPoint}
            disabled={isCreating}>
            <View className="bg-secondary w-full h-48 border-dotted border-primary border-2 flex items-center justify-center">
                <Image source={{ uri: product_thumb }} className="w-32 h-36" />
            </View>
            <View className="p-4 flex items-center gap-4">
                <Text className=" font-medium">{product_name}</Text>
                <View className="bg-green-100 rounded-full py-2 px-4">
                    <Text className="text-green-500 font-bold">{required_points}</Text>
                </View>
                <Text className="font-medium text-textLight">RICE</Text>
            </View>
        </Pressable>
    );
};

export default RedeemPointItem;
