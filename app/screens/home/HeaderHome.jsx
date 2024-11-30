import { View, Text, Image } from 'react-native';
import React from 'react';
import Info from './Info';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '../../../src/constants/theme';

import Row from '../../../src/components/Row';
import ButtonIcon from '../../../src/components/ButtonIcon';
import Header from '../../../src/components/Header';
import { router } from 'expo-router';
import useCarts from '@/src/features/cart/useCarts';
import Loading from '@/src/components/Loading';

const HeaderHome = ({ user }) => {
    const { carts, isPending } = useCarts();

    return (
        <Header bg="bg-header">
            <Row>
                <Image
                    source={{
                        uri: 'https://res.cloudinary.com/dkxoatxjl/image/upload/v1730511866/product_images/1730511861041.png',
                    }}
                    className="h-10 w-10 object-cover"
                />
                <Info user={user} />
            </Row>
            <Row>
                <ButtonIcon type="rounded">
                    <Feather name="bell" size={22} color="black" />
                </ButtonIcon>
                <ButtonIcon type="rounded" onPress={() => router.push('/screens/cart/CartScreen')}>
                    <Row>
                        <AntDesign name="shoppingcart" size={24} color={theme.colors.primary} />

                        <Text className="text-dark font-semibold text-lg">
                            {isPending ? <Loading /> : carts.metaData.cart_products.length}
                        </Text>
                    </Row>
                </ButtonIcon>
            </Row>
        </Header>
    );
};

export default HeaderHome;
