import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import RecommendationItem from './RecommendationItem';

const Recommendation = ({ recommendations, bottomSheetRef }) => {
    console.log(recommendations);
    return (
        <View className=" rounded-lg p-4 mt-4  bg-white border-2 border-gray">
            <Text className="text-2xl font-semibold">Hôm nay ăn gì?</Text>
            <ScrollView className="mt-4" horizontal showsHorizontalScrollIndicator={false}>
                {recommendations?.metaData.map((recommendation) => (
                    <RecommendationItem
                        recommendation={recommendation}
                        key={recommendation._id}
                        bottomSheetRef={bottomSheetRef}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Recommendation;
