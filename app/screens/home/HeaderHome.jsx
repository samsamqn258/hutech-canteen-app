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

const HeaderHome = ({ user }) => {
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
                        <Text className="text-dark font-semibold text-lg">8</Text>
                    </Row>
                </ButtonIcon>
            </Row>
        </Header>
    );
};

export default HeaderHome;
