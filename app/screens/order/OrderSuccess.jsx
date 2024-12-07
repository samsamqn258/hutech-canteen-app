import { View, Text } from 'react-native';
import React from 'react';
import Loading from '@/src/components/Loading';
import useOrdersSuccess from '@/src/features/order/useOrdersSuccess';
import OrderSuccessItem from './OrderSuccessItem';
import Empty from '@/src/components/Empty';

const OrderSuccess = ({ bottomSheetRef }) => {
    const { ordersSuccess, isOrderSucceeding } = useOrdersSuccess();

    if (isOrderSucceeding) return <Loading />;

    if (!ordersSuccess.metaData.length)
        return <Empty title="Chưa có đơn hàng nào được hoàn thành" />;

    return (
        <View className="mt-2">
            {ordersSuccess.metaData.map((order) => (
                <OrderSuccessItem order={order} bottomSheetRef={bottomSheetRef} key={order._id} />
            ))}
        </View>
    );
};

export default OrderSuccess;
