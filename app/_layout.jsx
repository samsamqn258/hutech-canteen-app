import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './(redux)/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppWrapper from './(redux)/AppWrapper';
import '../global.css';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000,
            staleTime: 0,
        },
    },
});

const RootLayout = () => {
    const router = useRouter();

    useEffect(() => {
        // Thiết lập xử lý thông báo khi app đang chạy
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true, // Hiển thị thông báo khi app ở foreground
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });

        // Đăng ký listener khi người dùng click vào thông báo
        const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
            const { navigateTo } = response.notification.request.content.data;
            if (navigateTo) {
                router.push(navigateTo); // Điều hướng đến màn hình được chỉ định trong dữ liệu thông báo
            }
        });

        return () => subscription.remove(); // Hủy đăng ký khi không còn cần thiết
    }, [router]);

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
