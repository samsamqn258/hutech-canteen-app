import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/src/constants/theme';
import { formatCurrency, formattedTime } from '@/src/helpers/helpers';
import { useSelector } from 'react-redux';
import useDeleteOrder from '@/src/features/order/useDeleteOrder';
import useToken from '@/src/hooks/useToken';
import QRCodeUI from '@/src/components/QRCodeUI';
import RatingStar from '@/src/components/RatingStar';
const ReviewDetail = ({ review, onClose }) => {
    const {
        _id: reviewID,
        review_order_id,
        review_rating,
        review_content,
        review_day,
    } = review.metaData;

    const {
        order_trackingNumber,
        order_product,
        order_checkout,
        estimated_delivery_time,
        order_status,
    } = review_order_id;
    return (
        <View>
            <View className="flex flex-row justify-between items-center px-4  pb-4 ">
                <View></View>
                <Text className="text-center text-xl font-bold text-text">Chi tiết đánh giá</Text>
                <Pressable onPress={onClose}>
                    <AntDesign name="closecircle" size={24} color={theme.colors.text} />
                </Pressable>
            </View>
            <View className="w-full h-72 bg-primary flex items-center justify-center">
                <Image
                    source={require('@/assets/images/rate.png')}
                    className="w-60 h-60 rounded-full"
                />
            </View>
            <View className="p-4 mt-4 bg-white">
                <Text className="text-lg text-textLight font-medium">
                    Thời gian hoàn thành dự kiến
                </Text>
                <Text className=" text-lg font-semibold">
                    {formattedTime(estimated_delivery_time)}
                </Text>
            </View>

            <View className="p-4 mt-4 bg-white">
                <Text className="text-2xl  font-semibold">Đánh giá của bạn</Text>

                <View className="mt-6">
                    <RatingStar rate={review_rating} readonly={true} size={50} />
                    <Text className="mt-4 text-lg font-medium">{review_content}</Text>
                    <Text className=" text-textLight font-medium">{formattedTime(review_day)}</Text>
                </View>
            </View>

            <View className="p-4 mt-4 bg-white">
                <Text className="text-2xl  font-semibold">Thông tin đơn hàng</Text>

                <View className="mt-4 flex flex-row items-center border-b-[1px] border-b-gray pb-4 ">
                    <View>
                        <Text className="text-base text-textLight">Trạng thái đơn hàng</Text>
                        <View className="flex flex-row gap-2 items-center mt-2">
                            <View className={`w-8 h-4 bg-green-400`}></View>
                            <Text className="text-lg font-medium">
                                {order_status && 'Đã nhận hàng'}
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="mt-4 flex flex-row items-center  ">
                    <View>
                        <Text className="text-base text-textLight">Mã đơn hàng</Text>

                        <Text className="text-lg font-medium">{order_trackingNumber}</Text>
                    </View>
                </View>
            </View>
            <View className="p-4 mt-4 bg-white">
                <Text className="text-2xl  font-semibold">Sản phẩm đã chọn</Text>
                <View className="flex flex-col gap-4 mt-4 ">
                    {order_product.map((product, index) => (
                        <View
                            key={index}
                            className="flex flex-row items-center gap-4 border-b-[1px] border-b-gray pb-3 justify-between">
                            <View className="flex flex-row gap-4 items-center">
                                <Text className="text-base font-medium">x{product.quantity}</Text>
                                <View>
                                    <Text className="text-lg font-semibold">
                                        {product.product_name}
                                    </Text>
                                    <Text className="text-base text-textLight">
                                        {product?.extra
                                            ?.map((extra) => extra.sideDish_name)
                                            .join(', ')}
                                    </Text>
                                </View>
                            </View>
                            <Text className="text-lg">{formatCurrency(product.totalPrice)}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View className="p-4 mt-4 bg-white">
                <Text className="text-2xl  font-semibold">Tổng cộng</Text>

                <View
                    className="flex flex-row items-center justify-between mt-6 border-b-[1px] border-b-gray pb-3
                    ">
                    <Text className="text-lg">Thành tiền</Text>
                    <Text className="text-lg">{formatCurrency(order_checkout.totalAmount)}</Text>
                </View>
                <View
                    className="flex flex-row items-center justify-between mt-4 border-b-[1px] border-b-gray pb-3
                    ">
                    <Text
                        className={`text-lg ${order_checkout.totalDiscount > 1 ? 'text-blue-400' : ''}`}>
                        {order_checkout.totalDiscount > 1
                            ? 'Khuyến mãi'
                            : 'Chưa áp dụng khuyến mãi'}
                    </Text>
                    <Text className="text-lg">
                        {formatCurrency(
                            order_checkout.totalDiscount > 1 ? order_checkout.totalDiscount : 0,
                        )}
                    </Text>
                </View>
                <View
                    className="flex flex-row items-center justify-between mt-4 border-b-[1px] border-b-gray pb-3
                    ">
                    <Text className="text-lg font-bold">Số tiền thanh toán</Text>
                    <Text className="text-lg font-bold">
                        {formatCurrency(order_checkout.finalPrice)}
                    </Text>
                </View>
                <View className="flex flex-row items-center gap-4  mt-6">
                    <Image
                        source={{
                            uri: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png',
                        }}
                        className="h-10 w-10"
                    />
                    <Text className="text-lg text-text">MOMO</Text>
                </View>
            </View>
        </View>
    );
};

export default ReviewDetail;
