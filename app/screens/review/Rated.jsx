import { ScrollView, View } from 'react-native';
import React from 'react';
import useRated from '@/src/features/review/useRated';
import Loading from '@/src/components/Loading';
import Empty from '@/src/components/Empty';

import RatedItem from './RatedItem';
const Rated = ({ bottomSheetRef }) => {
    const { rated, isPending } = useRated();

    if (isPending) return <Loading />;

    if (!rated.metaData.length) return <Empty title="Bạn chưa đánh giá lần nào!" />;

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}>
            {rated.metaData.map((rate) => (
                <RatedItem rate={rate} key={rate._id} bottomSheetRef={bottomSheetRef} />
            ))}
        </ScrollView>
    );
};

export default Rated;
