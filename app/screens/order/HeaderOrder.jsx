import { Text } from 'react-native';
import React from 'react';
import Header from '@/src/components/Header';
import ButtonIcon from '@/src/components/ButtonIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/src/constants/theme';
import { useRouter } from 'expo-router';

const HeaderOrder = () => {
    const router = useRouter();
    return (
        <Header bg="bg-white">
            <Text className="text-3xl font-medium">Đơn Hàng</Text>

            <ButtonIcon
                type="square"
                onPress={() => router.push('/screens/favourite/FavouriteScreen')}>
                <AntDesign name="hearto" size={24} color={theme.colors.primary} />
            </ButtonIcon>
        </Header>
    );
};

export default HeaderOrder;
