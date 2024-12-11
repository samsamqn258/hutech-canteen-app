import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
    let token;

    // Xử lý thông báo cho Android
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.DEFAULT,
            sound: true,
        });
    }

    if (Platform.OS === 'ios') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.IosAlertStyle.DEFAULT,
            sound: true,
        });
    }

    // Cấp phép thông báo cho cả iOS và Android
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.log('Permission not granted');
        return;
    }

    // Lấy Expo Push Token
    if (Platform.OS === 'ios') {
        // Đối với iOS, đảm bảo rằng hệ thống đã cấp phép thông báo
        console.log('Notification permission granted for iOS');
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Device token:', token);
    return token;
}
