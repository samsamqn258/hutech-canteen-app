import Tabs from '@/src/components/Tabs';
import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import BackButton from '@/src/components/BackButton';
import { useRouter } from 'expo-router';

import RedeemPointUsed from './RedeemPointUsed';
import RedeemPointNotUsed from './RedeemPointNotUsed';
import { SceneMap } from 'react-native-tab-view';

const RedeemPointHistory = () => {
    const router = useRouter();

    const renderScene = SceneMap({
        used: RedeemPointUsed,
        notUsed: RedeemPointNotUsed,
    });

    const routes = [
        { key: 'notUsed', title: 'Chưa sử dụng' },
        { key: 'used', title: 'Đã sử dụng' },
    ];

    return (
        <ScreenWrapper>
            <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                <BackButton router={router} />
                <Text className="my-0 mx-auto text-xl font-semibold">Lịch sử đổi Rice</Text>
            </View>

            <Tabs renderScene={renderScene} routes={routes} />
        </ScreenWrapper>
    );
};

export default RedeemPointHistory;
