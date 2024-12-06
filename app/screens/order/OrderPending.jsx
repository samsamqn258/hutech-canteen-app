import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import useOrdersPending from '@/src/features/order/useOrdersPending';
import Loading from '@/src/components/Loading';
import Empty from '@/src/components/Empty';

import OrderPendingItem from './OrderPendingItem';
const OrderPending = ({ bottomSheetRef }) => {
    const { ordersPending, isOrderPending } = useOrdersPending();

    if (isOrderPending) return <Loading />;

    if (!ordersPending.metaData.length)
        return <Empty title="Chưa có đơn hàng nào đang thực hiện" />;

    return (
        <View className="mt-2">
            {ordersPending.metaData.map((order, index) => (
                <OrderPendingItem order={order} bottomSheetRef={bottomSheetRef} key={index} />
            ))}
        </View>
    );
};

export default OrderPending;
