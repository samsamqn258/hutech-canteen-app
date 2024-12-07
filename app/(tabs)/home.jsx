import { ScrollView, Text, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import ButtonIcon from '@/src/components/ButtonIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/src/constants/theme';
import useToken from '@/src/hooks/useToken';
import { router, useLocalSearchParams } from 'expo-router';
import useUser from '@/src/features/auth/useUser';
import useRecommendations from '@/src/features/product/useRecommendations';
import Recommendation from '../screens/home/Recommendation';

// Hàm tính tổng giá
const calculateTotalPrice = (product, sideDishIDs, quantity) => {
    if (!product || !product.metaData?.product_details?.product) {
        return 0;
    }
    const { product_price, sideDish_id } = product?.metaData.product_details.product;

    // Lọc các món phụ được chọn
    const selectedSideDishes = sideDish_id.filter((dish) => sideDishIDs.includes(dish._id));

    // Tính tổng giá tiền của các món phụ
    const sideDishesPrice = selectedSideDishes.reduce((total, dish) => total + dish.price, 0);

    // Tính tổng giá sản phẩm
    const totalPrice = (product_price + sideDishesPrice) * quantity;

    return totalPrice;
};

const Home = () => {
    const bottomSheetRef = useRef(null);
    const scrollViewRef = useRef(null);
    const refs = useRef([]);
    const { user, isPending } = useUser();

    const { categories, isPending: isCategoriesLoading } = useCategories();
    const { product, isPending: isProductLoading } = useProduct();
    const token = useToken();
    const { productID } = useLocalSearchParams();
    const [sideDishID, setSideDishID] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [checked, setChecked] = useState({});
    const { addToCart, isAdding } = useAddToCart();
    const { recommendations, isRecommending } = useRecommendations();

    const totalPrice = useMemo(
        () => calculateTotalPrice(product, sideDishID, quantity),
        [product, sideDishID, quantity],
    );

    const handleAddToCart = () => {
        addToCart(
            { productID, sideDishID, quantity, token },
            {
                onSettled: () => {
                    setSideDishID([]);
                    setQuantity(1);
                    setChecked({});
                },
            },
        );
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((quantity) => quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity((quantity) => quantity + 1);
    };

    const handleClose = () => {
        setSideDishID([]);
        setQuantity(1);
        setChecked({});
        bottomSheetRef.current?.close();
    };

    const handleToggleCheck = (id) => {
        setChecked((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        setSideDishID((prev) =>
            !checked[id] ? [...prev, id] : prev.filter((sideDishId) => sideDishId !== id),
        );
    };

    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props} />,
        [],
    );

    const handleCategoryPress = useCallback((categoryIndex) => {
        if (scrollViewRef.current && refs.current[categoryIndex]) {
            refs.current[categoryIndex].measureLayout(
                scrollViewRef.current,
                (x, y) => {
                    scrollViewRef.current.scrollTo({ y, animated: true });
                },
                () => {},
            );
        }
    }, []);

    if (isRecommending || isCategoriesLoading || isPending) return <Loading />;

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="bg-body" ref={scrollViewRef}>
            <ScreenWrapper>
                {/* Header */}
                <HeaderHome user={user} />

                {/* User points */}
                <Point user={user} />

                {/* RecommendationsForUser */}
                <Recommendation recommendations={recommendations} />

                {/* Carousel */}
                <Carousel />

                {/* Categories */}
                <Categories categories={categories} onCategoryPress={handleCategoryPress} />

                {/* Products by category */}
                {categories.metaData.map((category, index) => (
                    <View key={category._id} ref={(el) => (refs.current[index] = el)}>
                        <CategoryProducts
                            categoryId={category._id}
                            bottomSheetRef={bottomSheetRef}
                        />
                    </View>
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
                                <ProductDetail
                                    product={product}
                                    onClose={handleClose}
                                    handleToggleCheck={handleToggleCheck}
                                    checked={checked}
                                />
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
                                    onPress={handleAddToCart}
                                    title={`Chọn - ${formatCurrency(totalPrice)}`}
                                    buttonStyle={{ flex: 1, height: 46, borderRadius: 10 }}
                                    textStyle={{ fontSize: 16 }}
                                    loading={isAdding}
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
