import { View, Text, Clipboard, ScrollView } from 'react-native';
import React from 'react';
import useRedeemPointsNotUsed from '@/src/features/redeemPoint/useRedeemPointsNotUsed';
import Loading from '@/src/components/Loading';
import Empty from '@/src/components/Empty';

import RedeemPointNotUsedItem from './RedeemPointNotUsedItem';
const RedeemPointNotUsed = () => {
    const { redeemPointsNotUsed, isPending } = useRedeemPointsNotUsed();

    if (isPending) return <Loading />;

    if (!redeemPointsNotUsed.metaData.length) return <Empty title="Bạn chưa có đổi điểm nào" />;

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}>
            {redeemPointsNotUsed.metaData.map((redeemPoint) => (
                <RedeemPointNotUsedItem redeemPoint={redeemPoint} key={redeemPoint._id} />
            ))}
        </ScrollView>
    );
};

export default RedeemPointNotUsed;
