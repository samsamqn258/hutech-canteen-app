import { Alert } from 'react-native';
import { API_BASE_URL } from '../../src/constants/url';
import * as Location from 'expo-location';

const API_URL = `${API_BASE_URL}/order`;

export const checkoutPreview = async (token, discountCode) => {
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
        return data.metaData;
    } catch (e) {
        throw new Error(e);
    }
};

export const getOrder = async (orderID, token) => {
    try {
        const res = await fetch(`${API_URL}/getOrderDetail/${orderID}`, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });
        if (!res.ok) throw new Error('API_URL đã sai');
        const data = await res.json();

        return data;
    } catch (err) {
        throw new Error('Không thể lấy chi tiết order');
    }
};

export const deleteOrder = async (order) => {
    const { orderID, token } = order;
    try {
        const res = await fetch(`${API_URL}/cancelOrder/${orderID}`, {
            method: 'PATCH',
            headers: {
                Authorization: token,
            },
        });
        if (!res.ok) throw new Error('API_URL đã sai');
    } catch (err) {
        throw new Error('Không thể xóa order');
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

        return location.coords;
    } catch (error) {
        // console.error('Lỗi khi lấy vị trí:', error);
        Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại. Vui lòng thử lại.');
    }
};

export const getListOrderPending = async (token) => {
    try {
        const res = await fetch(`${API_URL}/listOrderPendingOfUser`, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });

        if (!res.ok) throw new Error('API_URL đã sai');

        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Không thể lấy danh sách sản phảm đang chờ', err);
        throw new Error('Không thể lấy danh sách sản phẩm đang chờ');
    }
};

export const getListOrderCancelled = async (token) => {
    try {
        const res = await fetch(`${API_URL}/listOrderCancelledOfUser`, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });

        if (!res.ok) throw new Error('API_URL đã sai');

        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Không thể lấy danh sách sản phảm đã hủy', err);
        throw new Error('Không thể lấy danh sách sản phẩm đã hủy');
    }
};

export const getListOrderCompleted = async (token) => {
    try {
        const res = await fetch(`${API_URL}/listOrderCompletedOfUser`, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });

        if (!res.ok) throw new Error('API_URL đã sai');

        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Không thể lấy danh sách sản phảm đã hoàn tất', err);
        throw new Error('Không thể lấy danh sách sản phẩm đã hoàn tất');
    }
};

export const getListOrderSuccess = async (token) => {
    try {
        const res = await fetch(`${API_URL}/listOrderSuccessOfUser`, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });

        if (!res.ok) throw new Error('API_URL đã sai');

        const data = await res.json();

        return data;
    } catch (err) {
        console.error('Không thể lấy danh sách sản phảm đã thanh toán thành công', err);
        throw new Error('Không thể lấy danh sách sản phẩm đã thanh toán thành công');
    }
};
