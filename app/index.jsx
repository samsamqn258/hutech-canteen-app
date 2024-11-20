import React from 'react';
import { Redirect } from 'expo-router';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import 'react-native-gesture-handler';
const Index = () => {
    return (
        <ScreenWrapper>
            <Redirect href={'/screens/auth/welcome'} />
        </ScreenWrapper>
    );
};

export default Index;
