import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import RatingStar from '@/src/components/RatingStar';
import Input from '@/src/components/Input';
import useToken from '@/src/hooks/useToken';

import BackButton from '@/src/components/BackButton';

import { formatCurrency } from '@/src/helpers/helpers';
import useCreateRate from '../../../src/features/review/useCreateRate';
const RateProductScreen = () => {
    const router = useRouter();
    const { reviewID, finalPrice, order_trackingNumber, order_status } = useLocalSearchParams();
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    const { createRate, isCreating } = useCreateRate();
    const token = useToken();
    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleRate = () => {
        createRate(
            { token, reviewID, review_rating: rating, review_content: content },

            {
                onSettled: () => {
                    setRating(5);
                    setContent('');
                    router.back();
                },
            },
        );
    };
    return (
        <ScrollView className="bg-darkLight">
            <ScreenWrapper>
                <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Đánh giá</Text>
                </View>
                <View className="mt-4 bg-white  rounded-md p-4">
                    <View className=" flex flex-row items-center justify-between">
                        <Text className="text-xl font-semibold">Thông tin đơn hàng</Text>

                        {order_status && (
                            <View className="w-2 h-2 bg-green-400 rounded-full"></View>
                        )}
                    </View>
                    <Text className="mt-2 text-text font-medium">{order_trackingNumber}</Text>
                    <Text className="mt-2 text-text text-lg font-bold">
                        {formatCurrency(finalPrice)}
                    </Text>
                </View>
                <View className="mt-4 bg-white  rounded-md p-4 flex">
                    <Text className="text-xl font-semibold mb-8">Đánh giá của bạn</Text>

                    <RatingStar rate={rating} onRatingChange={handleRatingChange} />
                    <View className="mt-8">
                        <Text className="mb-3 text-text font-semibold">Nội dung đánh giá</Text>
                        <Input
                            type="inputLarge"
                            placeholder="Nhập nội dung đánh giá..."
                            onChange={(newContent) => setContent(newContent)}
                        />
                    </View>

                    <Pressable
                        className="bg-primary p-4 flex items-center rounded-xl mt-10 w-48 ml-auto"
                        onPress={handleRate}
                        disabled={isCreating}>
                        <Text className="text-lg text-white font-semibold">Xác nhận đánh giá</Text>
                    </Pressable>
                </View>
            </ScreenWrapper>
        </ScrollView>
    );
};

export default RateProductScreen;
