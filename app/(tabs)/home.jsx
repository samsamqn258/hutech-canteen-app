import { FlatList, Text } from 'react-native';
import React from 'react';
import Container from '@/components/Container';
import { useSelector } from 'react-redux';
import useCategories from '../category/useCategories';
import Loading from '@/components/Loading';
import HeaderHome from '../screens/home/HeaderHome';
import Point from '../screens/home/Point';
import Carousel from '../screens/home/Carousel';
import Categories from '../screens/home/Categories';
import CategoryProducts from '../screens/home/CategoryProducts';

const Home = () => {
  const user = useSelector((state) => state.auth.user.metaData.user);
  const { categories, isPending: isCategories } = useCategories();

  if (isCategories) return <Loading />;

  const renderHeader = () => (
    <Container>
      <HeaderHome user={user} />
      <Point user={user} />
      <Carousel />
      <Categories categories={categories} />
    </Container>
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
