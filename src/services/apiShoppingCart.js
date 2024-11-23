import { data } from 'autoprefixer';
import { API_BASE_URL } from '../../src/constants/url';
const API_URL = `${API_BASE_URL}/cart`;

export const addToCart = async (newProduct, token) => {
    try {
        const res = await fetch(`${API_URL}/addToCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(newProduct),
        });
        if (!res.ok) throw Error('API_URL đã sai');
        console.log(data);
        return data;
    } catch (e) {
        console.error('Không thể thêm vào giỏ hàng', e);
        throw new Error('Không thể thêm vào giỏ hàng', e);
    }
};
