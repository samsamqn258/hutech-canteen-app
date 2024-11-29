import { API_BASE_URL } from '../../src/constants/url';

const API_URL = `${API_BASE_URL}/order`;

export const checkoutPreview = async (token) => {
    try {
        const res = await fetch(`${API_URL}/checkoutPreview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        if (!res.ok) throw Error('API_URL đã sai');
        const data = await res.json();
        return data;
    } catch (e) {
        console.error('Không thể checkout thành công');
        throw new Error('Không thể checkout thành công');
    }
};
