import React from 'react';
import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '@/constants/theme';
const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarStyle: { height: 70 },
                tabBarLabelStyle: {
                    paddingBottom: 20,
                    fontWeight: 'bold',
                    fontSize: 12,
                },
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
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="tagso" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="other"
                options={{
                    title: 'Khác',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Feather name="menu" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
