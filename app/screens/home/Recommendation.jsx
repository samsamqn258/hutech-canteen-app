import { View, Text } from 'react-native';
import React from 'react';
import RecommendationItem from './RecommendationItem';

const Recommendation = ({ recommendations }) => {
    console.log(recommendations);
    return (
        <View className=" rounded-lg p-4 mt-4 border-2 border-gray">
            {recommendations?.metaData.map((recommendation) => (
                <RecommendationItem recommendation={recommendation} />
            ))}
        </View>
    );
};

export default Recommendation;
