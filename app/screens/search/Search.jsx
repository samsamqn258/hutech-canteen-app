import { View, Text } from 'react-native';
import React, { useState } from 'react';
import useSearch from './useSearch';
import Loading from '@/src/components/Loading';
import SearchInput from '@/src/components/SearchInput';
import Row from '@/src/components/Row';
import { router, usePathname } from 'expo-router';
import Products from '../home/Products';

export default function Search() {
    const pathname = usePathname();
    const { products, isPending } = useSearch();
    const [query, setQuery] = useState('');

    const handleChange = function (e) {
        if (pathname.startsWith('/screens/search')) router.setParams({ query: e });
        setQuery(e);
    };
    if (!products)
        return (
            <View className="pr-5 pl-5 bg-white h-full pt-16">
                <View>
                    <Row>
                        <SearchInput onChange={handleChange} value={query} />
                        <Text
                            className="text-base text-primary font-semibold"
                            onPress={router.back}>
                            Hủy
                        </Text>
                    </Row>
                </View>
            </View>
        );

    if (isPending) return <Loading />;

    return (
        <View className=" px-5 bg-white h-full py-16">
            <View className="border-b-[1px] border-gray pb-4">
                <Row>
                    <SearchInput onChange={handleChange} value={query} />
                    <Text className="text-base text-primary font-semibold" onPress={router.back}>
                        Hủy
                    </Text>
                </Row>
            </View>
            <View>
                <Products products={products.metaData.products} numColumn={1} />
            </View>
        </View>
    );
}
