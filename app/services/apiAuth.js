import { API_BASE_URL } from '../../constants/url';

const API_URL = `${API_BASE_URL}/user`;

export const login = async ({ email, password, selectedShop: shop }) => {
    try {
        const res = await fetch(`${API_URL}/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, shop }),
        });

        if (!res.ok) {
            throw new Error('Tài khoản hoặc mật khẩu không chính xác');
        }

        const data = await res.json();

        return data;
    } catch (e) {
        console.error(e);
        throw new Error('Tài khoản hoặc mật khẩu không chính xác');
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
        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
        throw new Error('Tài khoản hoặc mật khẩu đã tồn tại');
    }
};
