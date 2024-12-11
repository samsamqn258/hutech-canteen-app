import React from 'react';
import { Rating } from 'react-native-ratings';
const RatingStar = ({ rate, size = 40, onRatingChange, readonly }) => {
    return (
        <Rating
            startingValue={rate}
            ratingCount={5}
            imageSize={size}
            onFinishRating={onRatingChange}
            readonly={readonly}
        />
    );
};

export default RatingStar;
