import { ScrollView, View } from 'react-native';
import React from 'react';
import useRedeemPointsUsed from '@/src/features/redeemPoint/useRedeemPointsUsed';
import Loading from '@/src/components/Loading';
import Empty from '@/src/components/Empty';
import RedeemPointUsedItem from './RedeemPointUsedItem';
const RedeemPointUsed = () => {
    const { redeemPointsUsed, isPending } = useRedeemPointsUsed();

    if (isPending) return <Loading />;

    if (!redeemPointsUsed.metaData.length)
        return <Empty title="Bạn chưa sử dụng lượt đổi điểm nào" />;

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}>
            {redeemPointsUsed.metaData.map((redeemPoint) => (
                <RedeemPointUsedItem redeemPoint={redeemPoint} key={redeemPoint._id} />
            ))}
        </ScrollView>
    );
};

export default RedeemPointUsed;
