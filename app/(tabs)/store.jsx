import React, { useCallback, useMemo, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import HeaderStore from '../screens/store/HeaderStore';
import Stores from '../screens/store/Stores';
import useStores from '../screens/store/useStores';
import Loading from '@/components/Loading';
import { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import ScreenWrapper from '@/components/ScreenWrapper';
import CustomBottomSheetModal from '@/components/CustomBottomSheetModal';
import Button from '@/components/Button';

const Store = () => {
    const bottomSheetRef = useRef(null);
    const { stores, isPending } = useStores();

    const handleOpenPress = () => bottomSheetRef.current?.present();
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

                <Stores stores={stores} />
                <Button onPress={handleOpenPress} title="Bật" />
                <CustomBottomSheetModal
                    ref={bottomSheetRef}
                    renderBackdrop={renderBackdrop}
                    indexSnapPoint={3}>
                    <BottomSheetView>
                        <Text>Custom Bottom Sheet</Text>
                    </BottomSheetView>
                </CustomBottomSheetModal>
            </ScreenWrapper>
        </ScrollView>
    );
};

export default Store;
