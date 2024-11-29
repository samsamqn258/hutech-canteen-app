import { View, Text } from 'react-native';
import React from 'react';
import DiscountItem from './DiscountItem';

const Discounts = ({ discount, bottomSheetRef }) => {
    return (
        <View className="mt-3 flex flex-col gap-4">
            {discount.metaData.map((discount) => (
                <DiscountItem
                    discount={discount}
                    key={discount._id}
                    bottomSheetRef={bottomSheetRef}
                />
            ))}
        </View>
    );
};

export default Discounts;
