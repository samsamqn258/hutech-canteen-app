import { View, Text } from 'react-native';
import React from 'react';
import StoreItem from './StoreItem';
import useUser from '@/src/features/auth/useUser';
import Loading from '@/src/components/Loading';

const Stores = ({ stores, bottomSheetRef }) => {
    const { user, isPending } = useUser();
    if (isPending) return <Loading />;
    return (
        <View className="mt-6">
            <Text className="text-2xl font-medium">Các cửa hàng khác</Text>

            <View className="mt-3">
                {stores?.metaData?.map((store) => (
                    <StoreItem
                        store={store}
                        key={store._id}
                        bottomSheetRef={bottomSheetRef}
                        user={user}
                    />
                ))}
            </View>
        </View>
    );
};

export default Stores;
