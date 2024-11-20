import { View, Text } from 'react-native';
import React from 'react';
import StoreItem from './StoreItem';

const Stores = ({ stores, handleStoreItemPress }) => {
    return (
        <View className="mt-6">
            <Text className="text-2xl font-medium">Các cửa hàng khác</Text>

            <View className="mt-3">
                {stores.metaData.map((store) => (
                    <StoreItem store={store} key={store._id} onPress={handleStoreItemPress} />
                ))}
            </View>
        </View>
    );
};

export default Stores;
