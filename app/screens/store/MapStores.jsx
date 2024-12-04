import Loading from '@/src/components/Loading';
import React from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const MapStores = ({ mapStores, isMapStoring }) => {
    if (isMapStoring) return <Loading />;

    return (
        <View className="flex-1 h-[680px] mt-6">
            <MapView
                style={{ flex: 1 }}
                className="rounded-lg"
                initialRegion={{
                    latitude: 10.8016228,
                    longitude: 106.741344,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}>
                {mapStores?.data?.map((store, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: store.coordinates.latitude,
                            longitude: store.coordinates.longitude,
                        }}
                        title={store.shop_name}>
                        <Callout>
                            <View className="p-2 rounded-lg flex flex-col justify-center items-center">
                                <Text className="font-bold text-gray-800">{store.shop_name}</Text>
                                <Text className="text-sm text-gray-600">{store.location_name}</Text>
                                <Image
                                    source={{ uri: store.shop_image }}
                                    className="w-36 h-20 mt-2 rounded-lg"
                                />
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

export default MapStores;
