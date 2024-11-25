import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const StoreItem = ({ store, bottomSheetRef }) => {
    const {
        shop_image: shopImage,
        _id: shopID,
        shop_name: shopName,
        status,
        location_id: locationID,
    } = store;

    const handlePress = () => {
        router.setParams({ shopID });
        bottomSheetRef.current?.present();
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View className="mt-2 w-full bg-white p-4 h-32 rounded-lg shadow-sm flex flex-row gap-4">
                <Image
                    source={{ uri: shopImage }}
                    className="w-24 h-full rounded-lg object-cover"
                />
                <View className="flex flex-col justify-between">
                    <View>
                        <Text className="text-xs font-semibold text-text">HUTECH CANTEEN</Text>
                        <Text className="mt-1 text-lg">{shopName}</Text>
                    </View>
                    <Text
                        className={`${status === 'active' ? 'text-green-500' : 'text-text'} font-medium`}>
                        {status === 'active' ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default StoreItem;
