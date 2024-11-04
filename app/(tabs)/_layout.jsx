import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '@/constants/theme';
const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Trang chủ',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home-lightbulb-outline"
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="order"
                options={{
                    title: 'Đặt hàng',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Feather name="coffee" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="store"
                options={{
                    title: 'Cửa hàng',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="storefront-outline"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="discount"
                options={{
                    title: 'Ưu Đãi',
                }}
            />
            <Tabs.Screen
                name="other"
                options={{
                    title: 'Khác',
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
