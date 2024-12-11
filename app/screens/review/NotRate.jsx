import { ScrollView } from 'react-native';
import React from 'react';
import useNotRate from '@/src/features/review/useNotRate';
import Loading from '@/src/components/Loading';
import Empty from '@/src/components/Empty';
import NotRateItem from './NotRateItem';

const NotRate = () => {
    const { notRate, isPending } = useNotRate();

    if (isPending) return <Loading />;

    if (!notRate.metaData.length) return <Empty title="Bạn chưa có đơn hàng nào để đánh giá!" />;

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}>
            {notRate.metaData.map((rate) => (
                <NotRateItem rate={rate} key={rate._id} />
            ))}
        </ScrollView>
    );
};

export default NotRate;
