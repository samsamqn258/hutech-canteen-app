import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import BackButton from '@/src/components/BackButton';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import useFavourites from '@/src/features/favourite/useFavourites';
import Loading from '@/src/components/Loading';
import Empty from '@/src/components/Empty';
import Products from '../home/Products';

const FavouriteScreen = () => {
    const router = useRouter();
    const { favorites, isPending } = useFavourites();

    if (isPending) return <Loading />;

    if (!favorites.metaData.products.length)
        return (
            <ScreenWrapper bg="white">
                <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Sản Phẩm Yêu Thích</Text>
                </View>
                <Empty title="Bạn chưa có sản phẩm nào yêu thích." />
            </ScreenWrapper>
        );

    return (
        <ScreenWrapper bg="white">
            <View className="flex flex-row items-center px-5 border-b-[1px] pb-3 mx-[-20px] border-gray">
                <BackButton router={router} />
                <Text className="my-0 mx-auto text-xl font-semibold">Sản Phẩm Yêu Thích</Text>
            </View>
            <View>
                <Products products={favorites.metaData.products} numColumn={1} />
            </View>
        </ScreenWrapper>
    );
};

export default FavouriteScreen;
