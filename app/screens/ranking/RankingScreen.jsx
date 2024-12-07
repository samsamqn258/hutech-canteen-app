import { View, Text } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import BackButton from '@/src/components/BackButton';
import Point from '../home/Point';
import useUser from '@/src/features/auth/useUser';
import Loading from '@/src/components/Loading';

const RankingScreen = () => {
    const router = useRouter();
    const { user, isPending: isUserLoading } = useUser();

    if (isUserLoading) return <Loading />;

    return (
        <ScreenWrapper>
            <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                <BackButton router={router} />
                <Text className="my-0 mx-auto text-xl font-semibold">Hạng thành viên</Text>
            </View>
            <Point user={user} page="rankingScreen" />
        </ScreenWrapper>
    );
};

export default RankingScreen;
