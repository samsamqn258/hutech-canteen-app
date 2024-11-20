import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/src/constants/theme';

const ProductDetail = ({ product, onClose }) => {
    const {
        product_name,
        product_thumb,
        product_description,
        ingredients,
        product_ratingAverage,
        review_count,
        product_usage,
        product_price,
        sideDish_id,
    } = product.metaData.product_details.product;
    return (
        <View>
            <Pressable className="absolute top-2 right-6 z-10" onPress={onClose}>
                <AntDesign name="closecircle" size={30} color={theme.colors.text} />
            </Pressable>
            <View className="bg-secondary flex justify-center items-center">
                <Image source={{ uri: product_thumb }} className="w-80 h-96 object-cover" />
            </View>
            <View className="p-5 border-b-2 border-b-darkLight">
                <View className="flex flex-row justify-between items-center">
                    <Text className="text-base font-semibold text-text">HUTECH CANTEEN</Text>
                </View>
                <Text className="text-3xl font-semibold">{product_name}</Text>
            </View>
        </View>
    );
};

export default ProductDetail;
