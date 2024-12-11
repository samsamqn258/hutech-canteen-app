import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const RecommendationItem = ({ recommendation, bottomSheetRef }) => {
    const { _id: productID, product_name, product_thumb } = recommendation;

    const handlePress = () => {
        router.setParams({ productID });

        bottomSheetRef.current.present();
    };
    return (
        <Pressable
            className="  rounded-md py-2 px-1  mr-4 flex items-center justify-center"
            onPress={handlePress}>
            <Image className="h-16 w-16 object-cover" source={{ uri: product_thumb }} />
            <Text className="text-sm w-32 text-text text-center font-medium mt-2">
                {product_name}
            </Text>
        </Pressable>
    );
};

export default RecommendationItem;
