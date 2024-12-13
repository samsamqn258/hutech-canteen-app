import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/src/constants/theme';
import { formatCurrency, formattedTime } from '@/src/helpers/helpers';
import { useSelector } from 'react-redux';
import useDeleteOrder from '@/src/features/order/useDeleteOrder';
import useToken from '@/src/hooks/useToken';
import QRCodeUI from '@/src/components/QRCodeUI';
const OrderDetail = ({ order, onClose }) => {
    const {
        _id: orderID,
        estimated_delivery_time,
        order_status,
        order_cancellation_cutoff,
        order_trackingNumber,
        order_product,
        order_checkout,
    } = order.metaData;
    const user = useSelector((state) => state.auth.user.metaData.user);
    const { deleteOrder, isDeleting } = useDeleteOrder();
    const token = useToken();
    const handleDeleteOrder = () => {
        deleteOrder({ orderID, token });
        onClose();
    };

    const currentTime = new Date();

    const cancellationCutoffTime = new Date(order_cancellation_cutoff);

    const isCancellationDisabled = cancellationCutoffTime <= currentTime;

    let title = '';
    let backgroundColor = '';

    switch (order_status) {
        case 'pending':
            title = 'Đang xử lý';
            backgroundColor = 'bg-orange-400';
            break;
        case 'Success':
            title = 'Đã hoàn thành';
            backgroundColor = 'bg-green-400';
            break;
        case 'completed':
            title = 'Đã nhận món';
            backgroundColor = 'bg-green-400';
            break;

        case 'cancelled':
            title = 'Đã hủy đơn';
            backgroundColor = 'bg-red-400';
            break;
        default:
            title = 'Trạng thái không xác định';
            backgroundColor = 'bg-gray-400';
            break;
    }
    return (
        <View>
            <View className="flex flex-row justify-between items-center px-4  pb-4 ">
                <View></View>
                <Text className="text-center text-xl font-bold text-text">Trạng thái đơn hàng</Text>
                <Pressable onPress={onClose}>
                    <AntDesign name="closecircle" size={24} color={theme.colors.text} />
                </Pressable>
            </View>
            <View className="w-full h-72 bg-secondary flex items-center justify-center">
                {order_status === 'Success' ? (
                    <QRCodeUI value={order_trackingNumber} size={200} />
                ) : (
                    <Image
                        source={require('@/assets/images/z6105385135240_8d5fd936e38173e2b1f0cb53c08f5901.jpg')}
                        className="w-60 h-60 rounded-full"
                    />
                )}
            </View>
            <View className="p-4 mt-4 bg-white">
                <Text className="text-lg text-textLight font-medium">
                    Thời gian hoàn thành dự kiến
                </Text>
                <Text className=" text-lg font-semibold">
                    {order_status === 'cancelled'
                        ? 'Đơn hàng đã bị hủy'
                        : formattedTime(estimated_delivery_time)}
                </Text>
            </View>
            <View className="p-4 mt-4 bg-white">
                <Text className="text-lg text-red-400 font-medium">Được hủy trước khung giờ</Text>
                <Text className=" text-lg font-semibold text-red-400">
                    {formattedTime(order_cancellation_cutoff)}
                </Text>
            </View>
            <View className="p-4 mt-4 bg-white">
                <Text className="text-2xl  font-semibold">Thông tin đơn hàng</Text>
                <View className="mt-6 flex flex-row items-center border-b-[1px] border-b-gray pb-4 ">
                    <View className="border-r-[1px] border-r-gray mr-4 pr-32">
                        <Text className="text-base text-textLight">Người nhận</Text>
                        <Text className="text-lg">{user.name}</Text>
                    </View>
                    <View>
                        <Text className="text-base text-textLight">Email xác nhận</Text>
                        <Text className="text-lg">{user.email}</Text>
                    </View>
                </View>
                <View className="mt-4 flex flex-row items-center border-b-[1px] border-b-gray pb-4 ">
                    <View>
                        <Text className="text-base text-textLight">Trạng thái đơn hàng</Text>
                        <View className="flex flex-row gap-2 items-center mt-2">
                            <View className={`w-8 h-4 ${backgroundColor}`}></View>
                            <Text className="text-lg font-medium">{title}</Text>
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
            <Pressable
                className={`px-6 pt-6 pb-8 mt-4 bg-red-500 flex items-center justify-center ${isCancellationDisabled ? 'opacity-50' : ''}`}
                disabled={isCancellationDisabled || isDeleting}
                onPress={handleDeleteOrder}>
                <Text className="text-white text-xl font-semibold">
                    {isCancellationDisabled ? 'Không thể hủy' : 'Hủy đơn hàng'}
                </Text>
            </Pressable>
        </View>
    );
};

export default OrderDetail;
