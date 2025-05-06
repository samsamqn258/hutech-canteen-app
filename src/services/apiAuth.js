import { API_BASE_URL } from '../../src/constants/url';
import { registerForPushNotificationsAsync } from './../../notifications';
const API_URL = `${API_BASE_URL}/user`;

export const login = async ({ email, password, selectedShop: shop }) => {
    try {
        const deviceToken = await registerForPushNotificationsAsync();
        console.log('Đây là device token', deviceToken);
        if (!deviceToken) {
            throw new Error('Không thể lấy device token');
        }

        const res = await fetch(`${API_URL}/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                shop_id: shop,
                deviceToken,
            }),
        });

        if (!res.ok) {
            throw new Error('Tài khoản hoặc mật khẩu không chính xác');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Đăng nhập thất bại');
    }
};

export const register = async ({ email, password, name }) => {
    try {
        const res = await fetch(`${API_URL}/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });

        if (!res.ok) {
            throw new Error('Tài khoản đã tồn tại');
        }

        const data = await res.json();

        return data;
    } catch (e) {
        console.error(e);
        throw new Error('Tài khoản hoặc mật khẩu đã tồn tại');
    }
};

export const getUser = async (token) => {
    try {
        const res = await fetch(`${API_URL}/getUserInfo`, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });
        if (!res.ok) throw new Error('API_URL đã sai');
        const data = await res.json();
        console.log(data);
        return data.metaData;
    } catch (err) {
        throw new Error('Không thể lấy thông tin người dùng');
    }
};

export const updateUser = async ({ name, avatar, token }) => {
    try {
        const formData = new FormData();

        formData.append('name', name);

        console.log('Đây là ', avatar);

        if (avatar) {
            const file = {
                uri: avatar, // URI của ảnh
                type: 'image/jpeg', // Định dạng ảnh
                name: avatar.split('/').pop(), // Lấy tên file
            };

            console.log('CÒn đây là', file);
            formData.append('avatar', file); // Thêm ảnh vào FormData
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        const res = await fetch(`${API_URL}/updatePrUser`, {
            method: 'PATCH',
            headers: {
                Authorization: token,
            },
            body: formData,
        });

        if (!res.ok) {
            throw new Error(errorData.message || 'Cập nhật thông tin thất bại');
        }

        const data = await res.json();
        console.log('Cập nhật thành công:', data);
        return data;
    } catch (e) {
        console.error('Lỗi trong quá trình cập nhật:', e);
        throw new Error('Cập nhật thông tin thất bại');
    }
};
