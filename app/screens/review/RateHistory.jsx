import Tabs from '@/src/components/Tabs';
import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useRef } from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import BackButton from '@/src/components/BackButton';
import { useRouter } from 'expo-router';
import NotRate from './NotRate';
import Rated from './Rated';
import useRate from '@/src/features/review/useRate';
import { SceneMap } from 'react-native-tab-view';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import Loading from '@/src/components/Loading';
import ReviewDetail from './ReviewDetail';

const RateHistory = () => {
    const router = useRouter();
    const { review, isPending } = useRate();

    const bottomSheetRef = useRef(null);

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    const renderScene = SceneMap({
        notRate: NotRate,
        rated: () => <Rated bottomSheetRef={bottomSheetRef} />,
    });

    const routes = [
        { key: 'notRate', title: 'Chưa đánh giá' },
        { key: 'rated', title: 'Đã đánh giá' },
    ];

    return (
        <ScreenWrapper>
            <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                <BackButton router={router} />
                <Text className="my-0 mx-auto text-xl font-semibold">Đánh giá đơn hàng</Text>
            </View>

            <Tabs renderScene={renderScene} routes={routes} />

            {/* BottomSheet */}
            <CustomBottomSheetModal
                ref={bottomSheetRef}
                renderBackdrop={renderBackdrop}
                indexSnapPoint={3}
                bg="#f5f5f5">
                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                    {isPending ? (
                        <Loading />
                    ) : (
                        <ReviewDetail review={review} onClose={handleClose} />
                    )}
                </BottomSheetScrollView>
            </CustomBottomSheetModal>
        </ScreenWrapper>
    );
};

export default RateHistory;
