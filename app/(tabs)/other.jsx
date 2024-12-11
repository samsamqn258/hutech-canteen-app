import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import HeaderOther from '../screens/other/HeaderOther';
import BodyOther from '../screens/other/BodyOther';

const Other = () => {
    return (
        <ScrollView
            className="bg-darkLight"
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <ScreenWrapper>
                {/* Header */}
                <HeaderOther />

                {/*  Content */}
                <BodyOther />
            </ScreenWrapper>
        </ScrollView>
    );
};

export default Other;
