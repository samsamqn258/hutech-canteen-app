import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import ButtonIcon from '@/src/components/ButtonIcon';
import { formatCurrency } from '@/src/helpers/helpers';
import { theme } from '@/src/constants/theme';
import AntDesign from '@expo/vector-icons/AntDesign';

const ProductItem = ({ item, numColumn, onPress }) => {
    const handlePress = () => {
        onPress(item.product_id._id);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            className={`${numColumn === 2 ? 'w-[48%]' : 'w-[100%] flex flex-row gap-4'} mb-5`}>
            <View
                className={`${numColumn === 2 ? 'w-full h-44' : 'w-32 h-32 '} bg-secondary  flex items-center justify-center rounded-xl`}>
                <Image
                    source={{ uri: item.product_id.product_thumb }}
                    className={`${numColumn === 2 ? 'w-32 h-24' : 'w-20 h-20 '} object-cover`}
                />
            </View>

            <View
                className={`flex flex-row justify-between items-center ${numColumn === 2 ? '' : 'flex-1'}`}>
                <View className={`mt-2 ${numColumn === 2 ? '' : 'self-start'}`}>
                    <Text className="text-base font-medium">{item.product_id.product_name}</Text>
                    <Text className="mt-1 text-textLight">
                        {formatCurrency(item.product_id.product_price)}
                    </Text>
                </View>
                <ButtonIcon>
                    <AntDesign name="pluscircle" size={28} color={theme.colors.primary} />
                </ButtonIcon>
            </View>
        </TouchableOpacity>
    );
};

export default memo(ProductItem);
