import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { formattedTime } from '@/src/helpers/helpers';
import RatingStar from '@/src/components/RatingStar';
import { useRouter } from 'expo-router';

const RatedItem = ({ rate, bottomSheetRef }) => {
    const router = useRouter();
    const { _id, review_order_id, review_rating, review_content, review_day } = rate;

    const handleClick = () => {
        router.setParams({ reviewID: _id });
        bottomSheetRef.current?.present();
    };
    return (
        <Pressable
            onPress={handleClick}
            className=" 
     p-4 mt-4 bg-white flex flex-row justify-between items-start">
            <View>
                <Text className="text-text font-semibold text-lg">
                    {review_order_id.order_trackingNumber}
                </Text>
                <Text className="text-lg text-text mt-2">{review_content}</Text>
                <Text className="text-textLight font-medium mt-2">{formattedTime(review_day)}</Text>
            </View>
            <RatingStar rate={review_rating} size={20} readonly={true} />
        </Pressable>
    );
};

export default RatedItem;
