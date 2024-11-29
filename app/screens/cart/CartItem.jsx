import React, { useState } from 'react';
import { View, Text, Image, Modal, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { formatCurrency } from '@/src/helpers/helpers';
import ButtonIcon from '@/src/components/ButtonIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/src/constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useIncQuantity from '@/src/features/cart/useIncQuantity';
import useDecQuantity from '@/src/features/cart/useDecQuantity';
import useDeleteFromCart from '@/src/features/cart/useDeleteFromCart';
import useToken from '@/src/hooks/useToken';

const CartItem = ({ cart }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const token = useToken();
    const { product_id: product, quantity, totalPrice, sideDishes } = cart;
    const { _id: productID, product_name: productName, product_thumb: productThumb } = product;
    const { isIncreasing, IncProductQuantity } = useIncQuantity();
    const { isDecreasing, DecProductQuantity } = useDecQuantity();
    const { deleteFromCart, isDeleting } = useDeleteFromCart();

    const sideDishesID = sideDishes.map((sideDishID) => sideDishID.sideDish_id);

    const handleDecrease = () => {
        if (quantity === 1) {
            setModalVisible(true);
        } else {
            DecProductQuantity({ productID, token, sideDishesID });
        }
    };

    const handleIncrease = () => {
        IncProductQuantity({ productID, token, sideDishesID });
    };

    const handleConfirmDelete = () => {
        setModalVisible(false);
        deleteFromCart({ productID, token, sideDishesID });
    };

    const renderRightActions = () => (
        <View className="flex flex-row gap-2 items-center bg-red-500 p-2 w-20 justify-center">
            <ButtonIcon onPress={() => setModalVisible(true)}>
                <FontAwesome name="trash" size={24} color="white" />
            </ButtonIcon>
        </View>
    );

    return (
        <View className="flex-1 relative h-full">
            <Swipeable renderRightActions={renderRightActions}>
                <View className="w-full rounded-md bg-white p-4 flex flex-row gap-4 justify-between ">
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
                    <View className="flex flex-col items-center justify-around">
                        <Text className="text-text text-sm">{formatCurrency(totalPrice)}</Text>
                        <View className="flex flex-row gap-3 items-center  ">
                            <ButtonIcon disabled={isDecreasing} onPress={handleDecrease}>
                                <AntDesign
                                    name="minuscircle"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            </ButtonIcon>
                            <Text className="text-sm font-medium">{quantity}</Text>
                            <ButtonIcon disabled={isIncreasing} onPress={handleIncrease}>
                                <AntDesign
                                    name="pluscircle"
                                    size={20}
                                    color={theme.colors.primary}
                                />
                            </ButtonIcon>
                        </View>
                    </View>
                </View>
            </Swipeable>

            {/* Modal Xác Nhận */}
            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                statusBarTranslucent={true}
                onRequestClose={() => setModalVisible(false)}>
                <View className="flex-1 justify-center items-center bg-black/40">
                    <View className="bg-white p-6 rounded-lg w-[80%]">
                        <Text className="text-lg font-semibold mb-4">
                            Bạn có chắc chắn muốn xóa sản phẩm này?
                        </Text>
                        <View className="flex flex-row justify-end">
                            <Pressable
                                className="bg-red-500 py-2 px-4 rounded-lg"
                                onPress={handleConfirmDelete}
                                disabled={isDeleting}>
                                <Text className="text-white font-medium">Xóa</Text>
                            </Pressable>
                            <Pressable
                                className="bg-gray-300 py-2 px-4 rounded-lg"
                                onPress={() => setModalVisible(false)}>
                                <Text className="font-medium">Hủy</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CartItem;
