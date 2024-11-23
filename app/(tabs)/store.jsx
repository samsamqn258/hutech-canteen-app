import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import HeaderStore from '../screens/store/HeaderStore';
import Stores from '../screens/store/Stores';
import useStores from '../screens/store/useStores';
import useStore from '../screens/store/useStore';

import Loading from '@/src/components/Loading';
import { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import StoreDetail from '../screens/store/StoreDetail';

const Store = () => {
    const bottomSheetRef = useRef(null);
    const { stores, isPending } = useStores();
    const [selectedShopID, setSelectedShopID] = useState('');
    const { store, isPending: isStoring } = useStore(selectedShopID);

    const handleStoreItemPress = (shopID) => {
        setSelectedShopID(shopID);
        if (!isStoring) {
            bottomSheetRef.current?.present();
        }
    };

    const handleClose = () => {
        bottomSheetRef.current?.close();
        setSelectedShopID('');
    };

    useEffect(() => {
        if (!isStoring) {
            bottomSheetRef.current?.present();
        }
    }, [isStoring]);

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    if (isPending) return <Loading />;

    return (
        <ScrollView className="bg-darkLight" showsVerticalScrollIndicator={false}>
            <ScreenWrapper>
                {/* Header */}
                <HeaderStore />
                <Stores stores={stores} handleStoreItemPress={handleStoreItemPress} />
                <CustomBottomSheetModal
                    ref={bottomSheetRef}
                    renderBackdrop={renderBackdrop}
                    indexSnapPoint={2}>
                    <BottomSheetScrollView>
                        {isStoring ? (
                            <Loading />
                        ) : (
                            <StoreDetail store={store} onClose={handleClose} />
                        )}
                    </BottomSheetScrollView>
                </CustomBottomSheetModal>
            </ScreenWrapper>
        </ScrollView>
    );
};

export default Store;
