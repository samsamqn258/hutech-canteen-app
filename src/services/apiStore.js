import { API_BASE_URL } from '../constants/url';

const API_URL = `${API_BASE_URL}/shop`;

export const getStores = async () => {
    try {
        const res = await fetch(`${API_URL}/getAll`);

        if (!res.ok) {
            throw new Error('API_URL đã sai');
        }

        const data = await res.json();

        return data;
    } catch (e) {
        console.error('Lỗi không tìm thấy danh dách cửa hàng');
        throw new Error('Lỗi tìm thấy danh dách cửa hàng');
    }
};

export const getStore = async (shopID, token) => {
    try {
        const res = await fetch(`${API_URL}/getById/${shopID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        if (!res.ok) {
            throw new Error('API_URL đã sai');
        }
        const data = await res.json();
        console.log(data);

        return data;
    } catch (e) {
        console.error('Lỗi không tìm thấy cửa hàng theo ID');
        throw new Error('Lỗi không tìm thấy cửa hàng theo ID', e.message);
    }
};

export const getStoresWithLocation = async (token) => {
    try {
        const res = await fetch(`${API_URL}/getAllWithLocation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        if (!res.ok) {
            throw new Error('API_URL đã sai');
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error('Không thể lấy tọa độ của cửa hàng', e);
        throw new Error('Không thể lấy tọa độ của cửa hàng');
    }
};
