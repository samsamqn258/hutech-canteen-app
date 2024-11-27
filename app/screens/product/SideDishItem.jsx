import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { formatCurrency } from '@/src/helpers/helpers';
import Checkbox from '@/src/components/Checkbox';

const SideDishItem = ({ sideDish, onToggleCheck, checked }) => {
    // const [checked, setChecked] = useState(false);

    // const handleCheckSideDish = () => {
    //     setChecked((checked) => !checked);
    //     setSideDishID((prev) => {
    //         if (!checked) {
    //             return [...prev, sideDish._id];
    //         } else {
    //             return prev.filter((id) => id !== sideDish._id);
    //         }
    //     });
    // };
    return (
        <View key={sideDish._id} className="border-b-[1px] border-b-gray pb-6">
            <Checkbox
                label={
                    <View className="flex flex-row items-center justify-between flex-1">
                        <Text className="text-base  ">{sideDish.sideDish_name}</Text>
                        <Text className="text-base  ">{formatCurrency(sideDish.price)}</Text>
                    </View>
                }
                onChecked={onToggleCheck}
                checked={checked}
            />
        </View>
    );
};

export default SideDishItem;
