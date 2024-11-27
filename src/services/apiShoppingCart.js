import { data } from 'autoprefixer';
import { API_BASE_URL } from '../../src/constants/url';
import { canGoBack } from 'expo-router/build/global-state/routing';
const API_URL = `${API_BASE_URL}/cart`;

export const addToCart = async (newProduct) => {
    console.log(newProduct);
    const { productID: product_id, quantity, sideDishID: sideDish_ids, token } = newProduct;
    console.log(product_id, quantity, sideDish_ids);
    try {
        const res = await fetch(`${API_URL}/addToCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({ product_id, quantity, sideDish_ids }),
        });
        if (!res.ok) throw Error('API_URL đã sai');

        return data;
    } catch (e) {
        console.error('Không thể thêm vào giỏ hàng', e);
        throw new Error('Không thể thêm vào giỏ hàng', e);
    }
};

export const getCarts = async (token) => {
    try {
        const res = await fetch(`${API_URL}/getCartByUserId`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        if (!res.ok) throw Error('API_URL đã sai');
        const data = await res.json();

        return data;
    } catch (e) {
        console.error('Không thể lấy danh sách giỏ hàng');
        throw new Error('Không thể lấy danh sách giỏ hàng');
    }
};

export const IncProductQuantity = async (newQuantity) => {
    const { productID: product_id, token, sideDishesID: sideDish_ids } = newQuantity;
    try {
        const res = await fetch(`${API_URL}/IncProductQuantity`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                product_id,
                sideDish_ids,
            }),
        });
        if (!res.ok) throw Error('API_URL đã sai');
        const data = await res.json();

        return data;
    } catch (e) {
        console.error('Không thể tăng số lượng sản phẩm');
        throw new Error('Không thể tăng số lượng sản phẩm');
    }
};

export const DecProductQuantity = async (newQuantity) => {
    const { productID: product_id, token, sideDishesID: sideDish_ids } = newQuantity;

    try {
        const res = await fetch(`${API_URL}/DecProductQuantity`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({ product_id, sideDish_ids }),
        });
        if (!res.ok) throw Error('API_URL đã sai');
        const data = await res.json();

        return data;
    } catch (e) {
        console.error('Không thể giảm số lượng sản phẩm');
        throw new Error('Không thể giảm số lượng sản phẩm');
    }
};
