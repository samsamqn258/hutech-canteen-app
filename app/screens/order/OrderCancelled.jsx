import { View, Text } from 'react-native';
import React from 'react';
import useOrdersCancelled from '@/src/features/order/useOrdersCancelled';
import Loading from '@/src/components/Loading';
import OrderCanceledItem from './OrderCanceledItem';
import Empty from '@/src/components/Empty';

const OrderCancelled = ({ bottomSheetRef }) => {
    const { ordersCancelled, isOrderCancelling } = useOrdersCancelled();

    if (isOrderCancelling) return <Loading />;

    if (!ordersCancelled.metaData.length) return <Empty title="Chưa có đơn hàng nào đã được hủy" />;

    return (
        <View className="mt-2">
            {ordersCancelled.metaData.map((order) => (
                <OrderCanceledItem order={order} bottomSheetRef={bottomSheetRef} key={order._id} />
            ))}
        </View>
    );
};

export default OrderCancelled;
