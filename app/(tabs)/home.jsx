import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Header from '@/components/home/Header';
import Container from '@/components/Container';
import Point from '@/components/home/Point';
import { useSelector } from 'react-redux';
import Carousel from '@/components/home/Carousel';
import Categories from '@/components/home/Categories';
import Products from '@/components/home/Products';

const Home = () => {
    const user = useSelector((state) => state.auth.user.metaData.user);
    return (
        <ScrollView className="bg-body">
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
                <Categories />
                {/* List Product */}
                <Products />
            </Container>
        </ScrollView>
    );
};

export default Home;
