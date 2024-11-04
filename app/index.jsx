import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, Redirect, useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';

const Index = () => {
    const router = useRouter();
    return (
        <ScreenWrapper>
            <Redirect href={'auth/welcome'} />
        </ScreenWrapper>
    );
};

export default Index;
