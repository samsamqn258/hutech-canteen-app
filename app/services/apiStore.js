import { API_BASE_URL } from '../../constants/url';
import { token } from '../../constants/getToken';
const API_URL = `${API_BASE_URL}/shop`;

export const getShops = async () => {
    try {
        const res = await fetch(`${API_URL}/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    } catch (e) {
        console.error('Lỗi không tìm thấy danh dách cửa hàng');
        throw new Error('Lỗi tìm thấy danh dách cửa hàng');
    }
};

export const getShop = async (shopID) => {
    try {
        const res = await fetch(`${API_URL}/getById/${shopID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
    } catch (e) {
        console.error('Lỗi không tìm thấy cửa hàng theo ID');
        throw new Error('Lỗi không tìm thấy cửa hàng theo ID');
    }
};
