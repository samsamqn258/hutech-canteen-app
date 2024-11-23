import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useOpeningHour from '../openingHour/useOpeningHour.js';
import Loading from '@/src/components/Loading.jsx';
import { theme } from '@/src/constants/theme.js';
import OpeningHour from '../openingHour/OpeningHour.jsx';
const StoreDetail = ({ store, onClose }) => {
    const { location_id, opening_hours, shop_image, shop_name, status, createAt, description } =
        store.metaData;
    const { openingHour, isPending } = useOpeningHour(opening_hours);
    if (isPending) return <Loading />;

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = openingHour.metaData;

    return (
        <View>
            <Pressable className="absolute top-2 right-6 z-10" onPress={onClose}>
                <AntDesign name="closecircle" size={30} color={theme.colors.text} />
            </Pressable>
            <Image source={{ uri: shop_image }} className="w-full h-80 object-cover" />
            <View className="p-5 border-b-2 border-b-darkLight">
                <View className="flex flex-row justify-between items-center">
                    <Text className="text-base font-semibold text-text">HUTECH CANTEEN</Text>
                    <Text
                        className={`text-base font-medium ${status === 'active' ? 'text-green-500' : 'text-text'}`}>
                        {status === 'active' ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                    </Text>
                </View>
                <Text className="text-3xl font-semibold">{shop_name}</Text>

                {isPending ? (
                    <Loading />
                ) : (
                    <View className="rounded-xl w-72 my-0 mx-auto mt-4">
                        <Text className="text-dark text-2xl font-semibold text-center">
                            Khung giờ hoạt động
                        </Text>
                        <OpeningHour day="Thứ hai" open={monday.open} close={monday.close} />
                        <OpeningHour day="Thứ ba" open={tuesday.open} close={tuesday.close} />
                        <OpeningHour day="Thứ tư" open={wednesday.open} close={wednesday.close} />
                        <OpeningHour day="Thứ năm" open={thursday.open} close={thursday.close} />
                        <OpeningHour day="Thứ sáu" open={friday.open} close={friday.close} />
                        <OpeningHour day="Thứ bảy" open={saturday.open} close={saturday.close} />
                        <OpeningHour day="Chủ nhật" open={sunday.open} close={sunday.close} />
                    </View>
                )}
            </View>
            <View className="p-5 pt-6 flex flex-col gap-8">
                <View className="flex flex-row items-center gap-4 bor">
                    <View className="w-12 h-12 bg-darkLight flex items-center justify-center rounded-xl">
                        <Feather name="send" size={16} color="black" />
                    </View>
                    <Text className="w-80 text-lg text-textDark">
                        456 Điện biên phủ, Quận Bình Thạnh, Hồ Chí Minh, Việt Nam
                    </Text>
                </View>
                <View className="flex flex-row items-center gap-4 ">
                    <View className="w-12 h-12 bg-darkLight flex items-center justify-center rounded-xl">
                        <FontAwesome name="phone" size={16} color="black" />
                    </View>
                    <Text className="w-80 text-lg text-textDark">Liên hệ</Text>
                </View>
                <View className="flex flex-row items-center gap-4 ">
                    <View className="w-12 h-12 bg-darkLight flex items-center justify-center rounded-xl">
                        <FontAwesome name="share" size={16} color="black" />
                    </View>
                    <Text className="w-80 text-lg text-textDark">Chia sẽ với bạn bè</Text>
                </View>
            </View>
        </View>
    );
};

export default StoreDetail;
