import {
    View,
    Text,
    FlatList,
    Animated,
    Image,
    ScrollView,
} from 'react-native';
import React, { useRef } from 'react';
import { wp } from '@/helpers/common';

const CategoryItem = () => {
    const data = [
        {
            id: '1',
            title: 'Món Mới Phải Thử',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '2',
            title: 'Trà Trái Cây - HiTea',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '3',
            title: 'Trà Xanh - Chocolate',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '4',
            title: 'Cà Phê',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '5',
            title: 'Món Nóng',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '6',
            title: 'Món Nóng',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '7',
            title: 'Món Nóng',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '8',
            title: 'Món Nóng',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '9',
            title: 'Món Nóng',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '10',
            title: 'Món Nóng',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '11',
            title: 'Món Nóng',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '12',
            title: 'Món Nóng',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
        {
            id: '13',
            title: 'Món Nóng',
            imageUrl:
                'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730477356/product_images/1730477354520.png',
        },
    ];
    const scrollX = useRef(new Animated.Value(0)).current;

    const renderItem = ({ item }) => (
        <View className="w-20 mr-2 mb-4">
            <View className="flex gap-2 items-center">
                <View className="rounded-full object-cover bg-secondary p-4 h-14 w-14 flex items-center justify-center">
                    <Image
                        source={{ uri: item.imageUrl }}
                        className="h-10 w-10"
                    />
                </View>
                <Text className="text-text font-semibold">{item.title}</Text>
            </View>
        </View>
    );

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    return (
        <View className="mt-6">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
                onScroll={handleScroll}
            >
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={Math.ceil(data.length / 2)}
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
