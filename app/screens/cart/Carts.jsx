import { View, Text } from 'react-native';
import React from 'react';
import CartItem from './CartItem';

const Carts = ({ carts }) => {
    return (
        <View className="pt-4 flex flex-col gap-4">
            {carts.metaData.cart_products.map((cart, index) => {
                return <CartItem key={index} cart={cart} />;
            })}
        </View>
    );
};

export default Carts;
