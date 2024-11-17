import { FlatList, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import Container from '@/components/Container';
import { useSelector } from 'react-redux';
import useCategories from '../category/useCategories';
import Loading from '@/components/Loading';
import HeaderHome from '../screens/home/HeaderHome';
import Point from '../screens/home/Point';
import Carousel from '../screens/home/Carousel';
import Categories from '../screens/home/Categories';
import CategoryProducts from '../screens/home/CategoryProducts';
import BottomSheet from '@gorhom/bottom-sheet';
import ScreenWrapper from '@/components/ScreenWrapper';
const Home = () => {
    const snapPoints = useMemo(() => ['25%', '50%', '70%']);
    const user = useSelector((state) => state.auth.user.metaData.user);
    const { categories, isPending: isCategories } = useCategories();

    if (isCategories) return <Loading />;

    const renderHeader = () => (
        <ScreenWrapper>
            <HeaderHome user={user} />
            <Point user={user} />
            <Carousel />
            <Categories categories={categories} />
            <BottomSheet snapPoints={snapPoints}>
                <View>
                    <Text>This is awesome!</Text>
                </View>
            </BottomSheet>
        </ScreenWrapper>
    );

    return (
        <FlatList
            data={categories.metaData}
            renderItem={({ item }) => <CategoryProducts key={item._id} categoryId={item._id} />}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>No categories available</Text>}
            className="bg-body"
        />
    );
};

export default Home;
