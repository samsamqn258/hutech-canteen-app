import { View, Text } from 'react-native';
import React from 'react';

const Products = ({ products }) => {
    console.log(products);
    const { _id: productID } = products;
    return <View className="mt-8 bg-red-500"></View>;
};

export default Products;
