import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import '../global.css';
import { Provider } from 'react-redux';
import { store } from './(redux)/store.js';
const queryClient = new QueryClient();
const RootLayout = () => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="auth/welcome" />
                </Stack>
                <Toast />
            </QueryClientProvider>
        </Provider>
    );
};

export default RootLayout;
