import React from 'react';
import { View, Text, Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { formatCurrency } from '@/src/helpers/helpers';
import ButtonIcon from '@/src/components/ButtonIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/src/constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useIncQuantity from '@/src/features/cart/useIncQuantity';
import useDecQuantity from '@/src/features/cart/useDecQuantity';
import useToken from '@/src/hooks/useToken';

const CartItem = ({ cart, setModalVisible }) => {
    const token = useToken();
    const { product_id: product, quantity, totalPrice, sideDishes } = cart;
    const { _id: productID, product_name: productName, product_thumb: productThumb } = product;
    const { isIncreasing, IncProductQuantity } = useIncQuantity();
    const { isDecreasing, DecProductQuantity } = useDecQuantity();

    const sideDishesID = sideDishes.map((sideDishID) => sideDishID.sideDish_id);
    console.log(quantity);
    const handleDecrease = () => {
        if (quantity === 1) {
            setModalVisible(true);
        }
        DecProductQuantity({ productID, token, sideDishesID });
    };

    const handleIncrease = () => {
        IncProductQuantity({ productID, token, sideDishesID });
    };

    // Hàm render nút khi vuốt
    const renderRightActions = () => (
        <View className="flex flex-row">
            <View className="flex flex-row gap-2 items-center bg-darkLight p-2 ">
                <ButtonIcon disabled={isDecreasing} onPress={handleDecrease}>
                    <AntDesign name="minuscircle" size={20} color={theme.colors.primary} />
                </ButtonIcon>
                <Text className="text-sm font-medium">{quantity}</Text>
                <ButtonIcon disabled={isIncreasing} onPress={handleIncrease}>
                    <AntDesign name="pluscircle" size={20} color={theme.colors.primary} />
                </ButtonIcon>
            </View>
            <View className="flex flex-row gap-2 items-center bg-red-500 p-2 w-20 justify-center">
                <ButtonIcon>
                    <FontAwesome name="trash" size={24} color="white" />
                </ButtonIcon>
            </View>
        </View>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View className="w-full bg-white shadow-sm rounded-md p-4 flex flex-row gap-4 justify-between items-center">
                <View className="flex flex-row gap-4 items-center">
                    <Image source={{ uri: productThumb }} className="w-20 h-20" />
                    <View>
                        <Text className="text-base font-semibold">
                            x{quantity + ' '}
                            {productName}
                        </Text>
                        {sideDishes.map((sideDish) => (
                            <View key={sideDish.sideDish_id}>
                                <Text className="text-sm text-textLight">
                                    {sideDish.sideDish_name}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
                <Text className="text-text text-sm">{formatCurrency(totalPrice)}</Text>
            </View>
        </Swipeable>
    );
};

export default CartItem;
