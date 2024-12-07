import { View, Text, Clipboard } from 'react-native';
import React from 'react';
import ButtonIcon from '@/src/components/ButtonIcon';
import Feather from '@expo/vector-icons/Feather';
import QRCodeUI from '@/src/components/QRCodeUI';
import { formattedTime } from '@/src/helpers/helpers';
import Toast from 'react-native-toast-message';

const RedeemPointNotUsedItem = ({ redeemPoint }) => {
    const { _id, redeem_content, redeem_time, expiry_date, redeem_points, redeem_code } =
        redeemPoint;

    const handleCopyCode = () => {
        Clipboard.setString(redeem_code);
        Toast.show({
            type: 'success',
            text1: `Mã ${redeem_code} đã được sao chép!`,
        });
    };
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
                <Text className="mt-2 text-lg text-green-500 font-bold">{redeem_points}</Text>
            </View>
            <View className="flex items-end gap-4">
                <ButtonIcon onPress={handleCopyCode}>
                    <Feather name="copy" size={20} color="gray" />
                </ButtonIcon>
                <QRCodeUI value={redeem_code} size={80} />
            </View>
        </View>
    );
};

export default RedeemPointNotUsedItem;
