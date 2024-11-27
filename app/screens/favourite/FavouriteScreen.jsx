import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import BackButton from '@/src/components/BackButton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import useFavourites from '@/src/features/favourite/useFavourites';
import Loading from '@/src/components/Loading';
import Empty from '@/src/components/Empty';
import Products from '../home/Products';
import useProduct from '../product/useProduct';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ProductDetail from '../product/ProductDetail';
import ButtonIcon from '@/src/components/ButtonIcon';
import { theme } from '@/src/constants/theme';
import useAddToCart from '@/src/features/cart/useAddToCart';
import useToken from '@/src/hooks/useToken';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/src/components/Button';
import { formatCurrency } from '@/src/helpers/helpers';
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
const FavouriteScreen = () => {
    const bottomSheetRef = useRef(null);
    const router = useRouter();
    const { favorites, isPending } = useFavourites();
    const token = useToken();
    const { productID } = useLocalSearchParams();
    const [sideDishID, setSideDishID] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [checked, setChecked] = useState({});
    const { addToCart, isAdding } = useAddToCart();
    const { product, isPending: isProductLoading } = useProduct();

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
    if (isPending) return <Loading />;

    if (!favorites.metaData.products.length)
        return (
            <ScreenWrapper bg="white">
                <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Sản Phẩm Yêu Thích</Text>
                </View>
                <Empty title="Bạn chưa có sản phẩm nào yêu thích." />
            </ScreenWrapper>
        );

    return (
        <ScrollView className="bg-body" showsVerticalScrollIndicator={false}>
            <ScreenWrapper>
                <View className="flex flex-row items-center px-5 border-b-[1px] pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Sản Phẩm Yêu Thích</Text>
                </View>
                <View>
                    <Products
                        products={favorites.metaData.products}
                        numColumn={1}
                        bottomSheetRef={bottomSheetRef}
                    />
                </View>
                <CustomBottomSheetModal
                    ref={bottomSheetRef}
                    renderBackdrop={renderBackdrop}
                    indexSnapPoint={3}
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
                                    buttonStyle={{ flex: 1 }}
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

export default FavouriteScreen;
