import { View, Text, Animated, StyleSheet, FlatList } from 'react-native';
import React, { useRef } from 'react';
import Row from '../Row';
import Search from '../Search';
import ButtonIcon from '../ButtonIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/constants/theme';
import { wp } from '@/helpers/common';
import CategoryItem from './CategoryItem';
const Categories = () => {
    return (
        <View className="mt-6 rounded-xl bg-white shadow-3xl p-4">
            <Row>
                <Search />
                <ButtonIcon type="square">
                    <AntDesign
                        name="hearto"
                        size={24}
                        color={theme.colors.primary}
                    />
                </ButtonIcon>
            </Row>

            <CategoryItem />
        </View>
    );
};

export default Categories;
