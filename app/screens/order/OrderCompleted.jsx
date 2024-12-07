import { View, Text } from 'react-native';
import React from 'react';
import Empty from '@/src/components/Empty';
import useOrdersCompleted from '@/src/features/order/useOrdersCompleted';
import OrderCompletedItem from './OrderCompletedItem';
import Loading from '@/src/components/Loading';

const OrderCompleted = ({ bottomSheetRef }) => {
    const { ordersCompleted, isOrderCompleting } = useOrdersCompleted();

    if (isOrderCompleting) return <Loading />;

    if (!ordersCompleted.metaData.length)
        return <Empty title="Chưa có đơn hàng nào được nhận hoàn tất" />;

    return (
        <View className="mt-2">
            {ordersCompleted.metaData.map((order) => (
                <OrderCompletedItem order={order} bottomSheetRef={bottomSheetRef} key={order._id} />
            ))}
        </View>
    );
};

export default OrderCompleted;
