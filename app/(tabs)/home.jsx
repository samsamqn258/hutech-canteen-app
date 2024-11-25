import { FlatList, ScrollView, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useCategories from '../screens/category/useCategories';
import useAddToCart from '@/src/features/cart/useAddToCart';

import useProduct from '../screens/product/useProduct';
import Loading from '@/src/components/Loading';
import HeaderHome from '../screens/home/HeaderHome';
import Point from '../screens/home/Point';
import Carousel from '../screens/home/Carousel';
import Categories from '../screens/home/Categories';
import CategoryProducts from '../screens/home/CategoryProducts';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import ProductDetail from '../screens/product/ProductDetail';
import Button from '@/src/components/Button';
import { formatCurrency } from '@/src/helpers/helpers';

const Home = () => {
    const bottomSheetRef = useRef(null);
    const user = useSelector((state) => state.auth.user.metaData.user);
    const { categories, isPending: isCategoriesLoading } = useCategories();
    const { product, isPending: isProductLoading } = useProduct();
    const [sideDishID, setSideDishID] = useState([]);
    const { addToCart, isAdding } = useAddToCart();

    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity((quantity) => quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity((quantity) => quantity + 1);
    };

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    if (isCategoriesLoading) return <Loading />;

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="bg-body">
            <ScreenWrapper>
                {/* Header */}
                <HeaderHome user={user} />

                {/* User points */}
                <Point user={user} />

                {/* Carousel */}
                <Carousel />

                {/* Categories */}
                <Categories categories={categories} />

                {/* Products by category */}
                {categories.metaData.map((category) => (
                    <CategoryProducts
                        key={category._id}
                        categoryId={category._id}
                        bottomSheetRef={bottomSheetRef}
                    />
                ))}

                {/* Bottom sheet for product details */}
                <CustomBottomSheetModal
                    ref={bottomSheetRef}
                    renderBackdrop={renderBackdrop}
                    indexSnapPoint={4}
                    bg="#f5f5f5">
                    {isProductLoading ? (
                        <Loading />
                    ) : (
                        <View className="flex-1 relative">
                            <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 90 }}>
                                <ProductDetail product={product} onClose={handleClose} />
                            </BottomSheetScrollView>
                            <View className="absolute bottom-0 right-0 left-0 bg-white border-t-[1px] border-t-gray pt-2 pb-8 px-4 flex flex-row gap-10 items-center">
                                <View className="flex flex-row gap-4 items-center">
                                    <ButtonIcon onPress={handleDecrease}>
                                        <AntDesign
                                            name="minuscircle"
                                            size={28}
                                            color={theme.colors.primary}
                                        />
                                    </ButtonIcon>
                                    <Text>{quantity}</Text>
                                    <ButtonIcon onPress={handleIncrease}>
                                        <AntDesign
                                            name="pluscircle"
                                            size={28}
                                            color={theme.colors.primary}
                                        />
                                    </ButtonIcon>
                                </View>
                                <Button
                                    title={`Chọn - ${formatCurrency(product.metaData.product_details.product.product_price)}`}
                                    buttonStyle={{ flex: 1 }}
                                />
                            </View>
                        </View>
                    )}
                </CustomBottomSheetModal>
            </ScreenWrapper>
        </ScrollView>
    );
};

export default Home;
