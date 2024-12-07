import { View, Text } from 'react-native';
import React from 'react';
import { formattedTime } from '@/src/helpers/helpers';

const RedeemPointUsedItem = ({ redeemPoint }) => {
    const { _id, redeem_content, redeem_time, expiry_date, redeem_points, redeem_code } =
        redeemPoint;

    return (
        <View
            key={_id}
            className=" 
     p-4 mt-4 bg-white flex flex-row justify-between">
            <View>
                <Text className="text-lg w-48 font-semibold">{redeem_content}</Text>
                <Text className="mt-2 text-textLight font-medium">
                    {formattedTime(redeem_time)} - {formattedTime(expiry_date)}
                </Text>
                <Text className="mt-2 text-textLight font-medium">Mã đã dùng: {redeem_code}</Text>
            </View>
            <Text className="mt-2 text-lg text-red-500 font-bold">-{redeem_points}</Text>
        </View>
    );
};

export default RedeemPointUsedItem;
