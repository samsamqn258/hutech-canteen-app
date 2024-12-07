import { View, Text } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import useSearch from './useSearch';
import Loading from '@/src/components/Loading';
import SearchInput from '@/src/components/SearchInput';
import Row from '@/src/components/Row';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import Products from '../home/Products';
import Empty from '@/src/components/Empty';
import useToken from '@/src/hooks/useToken';
import useAddToCart from '@/src/features/cart/useAddToCart';
import useProduct from '../product/useProduct';
import CustomBottomSheetModal from '@/src/components/CustomBottomSheetModal';
import { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ProductDetail from '../product/ProductDetail';
import AntDesign from '@expo/vector-icons/AntDesign';
import ButtonIcon from '@/src/components/ButtonIcon';
import { theme } from '@/src/constants/theme';
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
export default function Search() {
    const bottomSheetRef = useRef(null);

    const pathname = usePathname();
    const { products, isPending } = useSearch();
    const [query, setQuery] = useState('');
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

    const handleChange = function (e) {
        if (pathname.startsWith('/screens/search')) router.setParams({ query: e });
        setQuery(e);
    };

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

    if (!products)
        return (
            <View className="pr-5 pl-5 bg-white h-full pt-16">
                <View>
                    <Row>
                        <SearchInput onChange={handleChange} value={query} />
                        <Text
                            className="text-base text-primary font-semibold"
                            onPress={router.back}>
                            Hủy
                        </Text>
                    </Row>
                </View>
            </View>
        );

    if (isPending) return <Loading />;

    if (!products.metaData.products)
        return (
            <View className=" px-5 bg-white h-full py-16">
                <View className="border-b-[1px] border-gray pb-4">
                    <Row>
                        <SearchInput onChange={handleChange} value={query} />
                        <Text
                            className="text-base text-primary font-semibold"
                            onPress={router.back}>
                            Hủy
                        </Text>
                    </Row>
                </View>
                <View className="mt-10">
                    <Empty title="Không tìm thấy sản phẩm" />
                </View>
            </View>
        );

    return (
        <View className=" px-5 bg-white h-full py-16">
            <View className="border-b-[1px] border-gray pb-4">
                <Row>
                    <SearchInput onChange={handleChange} value={query} />
                    <Text className="text-base text-primary font-semibold" onPress={router.back}>
                        Hủy
                    </Text>
                </Row>
            </View>
            <View>
                <Products
                    products={products?.metaData?.products}
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
        </View>
    );
}
