import { Alert } from 'react-native';
import { API_BASE_URL } from '../../src/constants/url';
import * as Location from 'expo-location';

const API_URL = `${API_BASE_URL}/order`;

export const checkoutPreview = async (token, discountCode) => {
    console.log(token, discountCode);
    try {
        const res = await fetch(`${API_URL}/checkoutPreview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                discount_code: discountCode,
            }),
        });

        if (res.status === 403) throw new Error('Mã giảm giá không hợp lệ');

        if (!res.ok) throw Error('API_URL đã sai');

        const data = await res.json();

        return data;
    } catch (e) {
        // console.error('Không thể checkout thành công');
        throw new Error(e);
    }
};

export const checkout = async (newCheckout) => {
    const { token, deliveryTime, note, discount_code, userLat, userLon } = newCheckout;
    try {
        const res = await fetch(`${API_URL}/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                discount_code,
                userLat,
                userLon,
                note,
                selectedDeliveryTime: deliveryTime,
            }),
        });
        if (!res.ok)
            throw new Error(
                'Vị trí của bạn đang ở hơi xa so với cửa hàng vui lòng lựa chọn lại thời gian lấy hàng',
            );

        const data = await res.json();
        console.log(data);
        return data.metaData;
    } catch (e) {
        throw new Error(e);
    }
};

export const getCurrentPosition = async () => {
    try {
        // Yêu cầu quyền truy cập vị trí
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert(
                'Quyền bị từ chối',
                'Ứng dụng cần quyền truy cập vị trí để tiếp tục. Vui lòng bật quyền trong cài đặt.',
            );
            return;
        }

        // Lấy vị trí hiện tại
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        console.log('Vị trí hiện tại:', { latitude, longitude });

        return location.coords;
    } catch (error) {
        // console.error('Lỗi khi lấy vị trí:', error);
        Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại. Vui lòng thử lại.');
    }
};

export const getListOrderPending = async;
