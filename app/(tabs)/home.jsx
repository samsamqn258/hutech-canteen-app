import { FlatList, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useCategories from '../screens/category/useCategories';
import useProduct from '../screens/product/useProduct';
import Loading from '@/src/components/Loading';
import HeaderHome from '../screens/home/HeaderHome';
import Point from '../screens/home/Point';
import Carousel from '../screens/home/Carousel';
import Categories from '../screens/home/Categories';
import CategoryProducts from '../screens/home/CategoryProducts';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import ProductDetail from '../screens/product/ProductDetail';
import { isPending } from '@reduxjs/toolkit';
import AntDesign from '@expo/vector-icons/AntDesign';
import ButtonIcon from '@/src/components/ButtonIcon';
import { theme } from '@/src/constants/theme';
import Button from '@/src/components/Button';
const Home = () => {
    const bottomSheetRef = useRef(null);
    const user = useSelector((state) => state.auth.user.metaData.user);
    const { categories, isPending: isCategoriesLoading } = useCategories();
    const [selectedProductID, setSelectedProductID] = useState('');
    const { product, isPending: isProductLoading } = useProduct(selectedProductID);

    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        setIsFavourite(product?.metaData?.product_details?.favorites_status ?? false);
    }, [product]);

    const handleOpenModalProduct = (productID) => {
        setSelectedProductID(productID);
        bottomSheetRef.current?.present();
    };

    useEffect(() => {
        // Sau khi selectedProductID thay đổi, gọi lại API để lấy product
        if (selectedProductID) {
            setIsFavourite(false); // Reset lại trạng thái yêu thích khi chọn sản phẩm mới
        }
    }, [selectedProductID]);

    const handleClose = () => {
        bottomSheetRef.current?.close();
        setSelectedProductID('');
    };

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    if (isCategoriesLoading) return <Loading />;

    const renderHeader = () => (
        <ScreenWrapper>
            <HeaderHome user={user} />
            <Point user={user} />
            <Carousel />
            <Categories categories={categories} />
            <CustomBottomSheetModal
                ref={bottomSheetRef}
                renderBackdrop={renderBackdrop}
                indexSnapPoint={4}
                bg="#f5f5f5"
                onChange={(index) => console.log('BottomSheet state:', index)}>
                <View className="flex-1 flex relative">
                    <BottomSheetScrollView
                        contentContainerStyle={{
                            paddingBottom: 90,
                        }}>
                        <ProductDetail
                            product={product}
                            onClose={handleClose}
                            setIsFavourite={setIsFavourite}
                            isFavourite={isFavourite}
                        />
                    </BottomSheetScrollView>
                    <View className="absolute bottom-0 right-0 left-0 bg-white border-t-[1px] border-t-gray pt-2 pb-8 px-4 flex flex-row gap-10 items-center">
                        <View className="flex flex-row items-center gap-4">
                            <ButtonIcon>
                                <AntDesign
                                    name="pluscircle"
                                    size={26}
                                    color={theme.colors.primary}
                                />
                            </ButtonIcon>
                            <Text>5</Text>
                            <ButtonIcon>
                                <AntDesign
                                    name="minuscircle"
                                    size={26}
                                    color={theme.colors.primary}
                                />
                            </ButtonIcon>
                        </View>

                        <Button title={`Chọn - 30000`} buttonStyle={{ flex: 1 }} />
                    </View>
                </View>
            </CustomBottomSheetModal>
        </ScreenWrapper>
    );

    return (
        <FlatList
            data={categories.metaData}
            renderItem={({ item }) => (
                <CategoryProducts
                    key={item._id}
                    categoryId={item._id}
                    onOpenModalProduct={handleOpenModalProduct}
                />
            )}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>No categories available</Text>}
            className="bg-body"
        />
    );
};

export default Home;
