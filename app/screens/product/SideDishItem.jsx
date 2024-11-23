import { View, Text } from 'react-native';
import React from 'react';
import { formatCurrency } from '@/src/helpers/helpers';
import Checkbox from '@/src/components/Checkbox';

const SideDishItem = ({ sideDish }) => {
    return (
        <View key={sideDish._id} className="border-b-[1px] border-b-gray pb-6">
            <Checkbox
                label={
                    <View className="flex flex-row items-center justify-between flex-1">
                        <Text className="text-base  ">{sideDish.sideDish_name}</Text>
                        <Text className="text-base  ">{formatCurrency(sideDish.price)}</Text>
                    </View>
                }
            />
        </View>
    );
};

export default SideDishItem;
