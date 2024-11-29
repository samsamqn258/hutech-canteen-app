import { API_BASE_URL } from '../../src/constants/url';
const API_URL = `${API_BASE_URL}/discount`;

export const getDiscounts = async (token) => {
    try {
        const res = await fetch(`${API_URL}/getValidDiscounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        if (!res.ok) {
            throw new Error('API_URL đã sai');
        }
        const data = res.json();
        return data;
    } catch (e) {
        console.error('Không thể lấy danh sách giảm giá', e);
        throw new Error('Không thể lấy danh sách giảm giá');
    }
};

export const getDiscount = async (discountID, token) => {
    try {
        const res = await fetch(`${API_URL}/getDiscountByIdForUser/${discountID}`, {
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
        console.error('Lỗi không tìm thấy mã giảm giá theo ID');
        throw new Error('Lỗi không tìm thấy mã giảm giá theo ID', e.message);
    }
};
