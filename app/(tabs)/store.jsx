import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import HeaderStore from '../screens/store/HeaderStore';
import Stores from '../screens/store/Stores';
import useStores from '../screens/store/useStores';
import useStore from '../screens/store/useStore';

import Loading from '@/src/components/Loading';
import { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
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
    };

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    useEffect(() => {
        if (selectedShopID) {
            bottomSheetRef.current?.present();
        }
    }, [selectedShopID]);

    // const handleClosePress = () => bottomSheetRef.current?.close();
    // const handleCollapsePress = () => bottomSheetRef.current?.collapse();
    // const snapeToIndex = (index) => bottomSheetRef.current?.snapToIndex(index);

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
                    <BottomSheetView>
                        {isStoring ? (
                            <Loading />
                        ) : (
                            <StoreDetail store={store} onClose={handleClose} />
                        )}
                    </BottomSheetView>
                </CustomBottomSheetModal>
            </ScreenWrapper>
        </ScrollView>
    );
};

export default Store;
