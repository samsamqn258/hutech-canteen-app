import { View, Text, Image } from 'react-native';
import React from 'react';

const StoreItem = ({ store }) => {
  const {
    shop_image: shopImage,
    _id: shopID,
    shop_name: shopName,
    status,
    location_id: locationID,
  } = store;
  return (
    <View className="mt-1 w-full bg-white p-4 h-32 rounded-lg shadow-xl flex flex-row gap-4">
      <Image source={{ uri: shopImage }} className="w-24 h-full rounded-lg object-cover" />
      <View className="flex flex-col justify-between">
        <View>
          <Text className="text-xs font-semibold text-text">HUTECH CANTEEN</Text>
          <Text className="mt-1 text-lg">{shopName}</Text>
        </View>

        <Text className={`${status === 'active' ? 'text-green-500' : 'text-text'} font-medium`}>
          {status === 'active' ? 'Đang hoạt động' : 'Ngưng hoạt động'}
        </Text>
      </View>
    </View>
  );
};

export default StoreItem;
