import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/src/constants/theme';
import { formatCurrency } from '@/src/helpers/helpers';
import ButtonIcon from '@/src/components/ButtonIcon';
import Row from '@/src/components/Row';
import SideDishItem from './SideDishItem';
import useAddFavourite from '@/src/features/favourite/useAddFavourite';
import useDeleteFavourite from '@/src/features/favourite/useDeleteFavourite';
import useToken from '@/src/hooks/useToken';
const ProductDetail = ({ product, onClose }) => {
    const [isFavourite, setIsFavourite] = useState(
        product?.metaData?.product_details?.favorites_status,
    );
    const token = useToken();
    const { addFavourite, isFavouriting } = useAddFavourite();
    const { deleteFavourite, isDeleting } = useDeleteFavourite();

    const {
        _id: product_id,
        product_name,
        product_thumb,
        product_description,
        ingredients,
        product_ratingAverage,
        review_count,
        product_usage,
        product_price,
        sideDish_id,
    } = product.metaData.product_details.product;

    const toggleFavourite = () => {
        const action = isFavourite ? deleteFavourite : addFavourite;
        action({ token, product_id });
        setIsFavourite(!isFavourite);
    };

    return (
        <View>
            {/* Nút đóng modal */}
            <Pressable className="absolute top-2 right-6 z-10" onPress={onClose}>
                <AntDesign name="closecircle" size={30} color={theme.colors.text} />
            </Pressable>
            {/* Nội dung sản phẩm */}
            <View className="bg-secondary flex justify-center items-center">
                <Image source={{ uri: product_thumb }} className="w-80 h-96 object-cover" />
            </View>
            <View className="flex flex-col gap-3">
                <View className="p-5 bg-white">
                    <View className=" flex flex-row justify-between items-start ">
                        <View className="flex-1">
                            <Text className="text-2xl font-semibold w-56">{product_name}</Text>

                            <Text className="mt-1 text-lg font-semibold text-textLight">
                                {formatCurrency(product_price)}
                            </Text>
                        </View>

                        <Row>
                            <Text className="text-base  font-medium">
                                {product_ratingAverage > 3
                                    ? product_ratingAverage + ' ⭐'
                                    : 'Chưa có đánh giá nào'}
                            </Text>
                            <ButtonIcon type="outline" onPress={toggleFavourite}>
                                {isFavourite ? (
                                    <AntDesign
                                        name="heart"
                                        size={24}
                                        color={theme.colors.primary}
                                    />
                                ) : (
                                    <AntDesign name="hearto" size={24} color={'black'} />
                                )}
                            </ButtonIcon>
                        </Row>
                    </View>
                    <Text className="mt-3 text-lg text-textDark line-clamp-4 ">
                        {product_description}
                    </Text>
                    <Text className="mt-1 text-lg text-textDark">{ingredients}</Text>
                    <Text className="mt-1 text-lg text-textDark">*{product_usage}</Text>
                </View>
                <View className="p-5 bg-white">
                    <Text className="text-xl font-semibold">Lựa chọn thêm</Text>
                    <View className="flex flex-col gap-4 mt-8">
                        {sideDish_id?.map((sideDish) => (
                            <SideDishItem key={sideDish._id} sideDish={sideDish} />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProductDetail;
