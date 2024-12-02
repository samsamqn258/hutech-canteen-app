import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import ButtonIcon from '@/src/components/ButtonIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Discounts from './Discounts';
import useCheckoutUseDiscount from '@/src/features/order/useCheckoutUseDiscount';
import { router } from 'expo-router';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import useDiscount from '@/src/features/discount/useDiscount';
import DiscountDetail from './DiscountDetail';
import Loading from '@/src/components/Loading';

const SelectDiscount = ({ bottomSheetRef, discounts, discount, isLoading, discountCodeParams }) => {
    const bottomSheetRefIn = useRef(null);
    const { checkoutUseDiscount, isCheckoutUseDiscounting } = useCheckoutUseDiscount();
    const [discountCode, setDiscountCode] = useState('');

    const renderBackdropIn = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    const handleCloseIn = () => {
        bottomSheetRefIn.current?.close();
    };

    const handleApplyDiscount = (discountCode) => {
        router.setParams({ discountCode });
        checkoutUseDiscount({ discountCode });
    };

    return (
        <View>
            {/* Header */}
            <View className="flex flex-row justify-between items-center ">
                <ButtonIcon onPress={handleClose}>
                    <MaterialIcons name="arrow-back-ios" size={22} color="black" />
                </ButtonIcon>

                <Text className="text-2xl font-medium">Nhập mã khuyến mãi</Text>
                <ButtonIcon onPress={handleClose}>
                    <AntDesign name="close" size={22} color="black" />
                </ButtonIcon>
            </View>

            {/* Input for Discount Code */}
            <View
                className="flex flex-row  mt-8 
        ">
                <TextInput
                    value={discountCode}
                    onChangeText={setDiscountCode}
                    placeholder="Nhập mã khuyến mãi"
                    className="flex-1  text-black  bg-white  rounded-l-lg items-center justify-center p-5"
                />
                <Pressable
                    className=" bg-primary p-5 rounded-r-lg justify-center items-center "
                    onPress={() => handleApplyDiscount(discountCode)}
                    disabled={isCheckoutUseDiscounting}>
                    <Text className="text-white font-semibold">Áp dụng</Text>
                </Pressable>
            </View>

            {/* Discount List */}
            <Text className="mt-10 text-xl font-bold">Sẵn sàng sử dụng</Text>

            <Discounts discounts={discounts} bottomSheetRef={bottomSheetRefIn} />

            {/* Bottom Sheet */}
            <CustomBottomSheetModal
                ref={bottomSheetRefIn}
                renderBackdrop={renderBackdropIn}
                indexSnapPoint={3}>
                <BottomSheetScrollView style={{ padding: 20 }}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <DiscountDetail
                            discount={discount}
                            onCloseIn={handleCloseIn}
                            handleApplyDiscount={handleApplyDiscount}
                            discountCodeParams={discountCodeParams}
                        />
                    )}
                </BottomSheetScrollView>
            </CustomBottomSheetModal>
        </View>
    );
};

export default SelectDiscount;
