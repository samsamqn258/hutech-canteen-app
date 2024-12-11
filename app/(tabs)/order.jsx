import React, { useCallback, useRef } from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import HeaderOrder from '../screens/order/HeaderOrder';
import OrderPending from '../screens/order/OrderPending';
import OrderCompleted from '../screens/order/OrderCompleted';
import OrderSuccess from '../screens/order/OrderSuccess';
import OrderCancelled from '../screens/order/OrderCancelled';
import Tabs from '@/src/components/Tabs';
import { SceneMap } from 'react-native-tab-view';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import Loading from '@/src/components/Loading';
import useOrder from '@/src/features/order/useOrder';
import OrderDetail from '../screens/order/OrderDetail';
const Order = () => {
    const { order, isOrdering } = useOrder();
    const bottomSheetRef = useRef(null);

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    const renderScene = SceneMap({
        pending: () => <OrderPending bottomSheetRef={bottomSheetRef} />,
        completed: () => <OrderCompleted bottomSheetRef={bottomSheetRef} />,
        success: () => <OrderSuccess bottomSheetRef={bottomSheetRef} />,
        cancelled: () => <OrderCancelled bottomSheetRef={bottomSheetRef} />,
    });

    const routes = [
        { key: 'pending', title: 'Đang thực hiện' },
        { key: 'success', title: 'Đã hoàn thành' },
        { key: 'completed', title: 'Đã nhận món' },
        { key: 'cancelled', title: 'Đã hủy' },
    ];

    return (
        <ScreenWrapper>
            {/* Header */}
            <HeaderOrder />
            {/* Tab View */}
            <Tabs renderScene={renderScene} routes={routes} />

            {/* BottomSheet */}
            <CustomBottomSheetModal
                ref={bottomSheetRef}
                renderBackdrop={renderBackdrop}
                indexSnapPoint={3}
                bg="#f5f5f5">
                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                    {isOrdering ? <Loading /> : <OrderDetail order={order} onClose={handleClose} />}
                </BottomSheetScrollView>
            </CustomBottomSheetModal>
        </ScreenWrapper>
    );
};

export default Order;
