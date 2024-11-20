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
import { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import ProductDetail from '../screens/product/ProductDetail';
const Home = () => {
    const bottomSheetRef = useRef(null);
    const user = useSelector((state) => state.auth.user.metaData.user);
    const { categories, isPending: isCategories } = useCategories();
    const [selectedProductID, setSelectedProductID] = useState('');
    const { product, isPending: isProduct } = useProduct(selectedProductID);

    const handleOpenModalProduct = (productID) => {
        setSelectedProductID(productID);
    };

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    useEffect(() => {
        if (selectedProductID) {
            bottomSheetRef.current?.present();
        }
    }, [selectedProductID]);

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    if (isCategories) return <Loading />;

    const renderHeader = () => (
        <ScreenWrapper>
            <HeaderHome user={user} />
            <Point user={user} />
            <Carousel />
            <Categories categories={categories} />
            <CustomBottomSheetModal
                ref={bottomSheetRef}
                renderBackdrop={renderBackdrop}
                indexSnapPoint={4}>
                <BottomSheetView>
                    {isProduct ? (
                        <Loading />
                    ) : (
                        <ProductDetail product={product} onClose={handleClose} />
                    )}
                </BottomSheetView>
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
