import React from 'react';
import { Provider } from 'react-redux';
import { store } from './(redux)/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import AppWrapper from './(redux)/AppWrapper.js';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

const RootLayout = () => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <GestureHandlerRootView>
                    <BottomSheetModalProvider>
                        <AppWrapper />
                    </BottomSheetModalProvider>
                </GestureHandlerRootView>
                <Toast />
            </QueryClientProvider>
        </Provider>
    );
};

export default RootLayout;
