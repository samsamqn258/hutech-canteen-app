import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Header from '@/components/home/Header';
import Container from '@/components/Container';
import Point from '@/components/home/Point';
import { useSelector } from 'react-redux';
import Carousel from '@/components/home/Carousel';
import Categories from '@/components/home/Categories';
import Products from '@/components/home/Products';
import useCategories from '../category/useCategories';
import useProductsInCategory from '../product/useProductsInCategory';
import Loading from '@/components/Loading';
import CategoryProducts from '@/components/home/CategoryProducts';

const Home = () => {
    const user = useSelector((state) => state.auth.user.metaData.user);
    const { categories, isPending: isCategories } = useCategories();

    if (isCategories) return <Loading />;

    return (
        <ScrollView className="bg-body" showsVerticalScrollIndicator={false}>
            <Container>
                {/* Header */}
                <Header user={user} />
                {/* My Point */}
                <Point user={user} />
                {/* List Feature
                <Features /> */}
                {/* Carousel */}
                <Carousel />
                {/* List Category */}
                <Categories categories={categories} />
                {/* List Product In Category */}
                {categories.metaData.map((category) => (
                    <CategoryProducts
                        key={category._id}
                        categoryId={category._id}
                    />
                ))}
            </Container>
        </ScrollView>
    );
};

export default Home;
