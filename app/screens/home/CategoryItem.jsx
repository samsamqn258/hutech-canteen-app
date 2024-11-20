import { View, Text, FlatList, Animated, Image, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import { wp } from '@/src/helpers/common';
import Empty from '@/src/components/Empty';

const CategoryItem = ({ categories }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const data = categories?.metaData;

    if (!data) return <Empty value="Không có danh mục sản phẩm nào" />;

    const renderItem = ({ item }) => (
        <View className="w-20 mr-4 mb-4">
            <View className="flex gap-2 items-center">
                <View className="rounded-full  bg-secondary p-4 h-14 w-14 flex items-center justify-center">
                    <Image
                        source={{ uri: item.category_images }}
                        className="h-10 w-10 object-cover"
                    />
                </View>
                <Text className="text-text font-semibold">{item.category_name}</Text>
            </View>
        </View>
    );

    const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: false,
    });

    return (
        <View className="mt-6">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
                onScroll={handleScroll}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={Math.ceil(data.length / 3 + 1)}
                />
            </ScrollView>
            <View className="h-[4px] w-10 bg-slate-300 rounded-full mt-3 self-center">
                <Animated.View
                    style={[
                        {
                            width: scrollX.interpolate({
                                inputRange: [0, wp(100) * (data.length - 1)],
                                outputRange: [20, wp(100)],
                                extrapolate: 'clamp',
                            }),
                        },
                    ]}
                    className="h-full bg-primary rounded-full"
                />
            </View>
        </View>
    );
};

export default CategoryItem;
