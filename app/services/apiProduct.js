import { API_BASE_URL } from '../../constants/url';
const API_URL = `${API_BASE_URL}/product`;

export const getProductsInCategory = async (categoryID, token) => {
    try {
        const res = await fetch(`${API_URL}/ProductInCategory/${categoryID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        if (!res.ok) throw Error('API_URL đã sai');

        const data = await res.json();

        return data;
    } catch (err) {
        console.error('Không lấy được danh sách sản phẩm trong danh mục');
        throw Error('Không lấy được danh sách sản phẩm trong danh mục');
    }
};

export const searchProduct = async (query, token) => {
    try {
        const res = await fetch(`${API_URL}/search?keySearch=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        if (!res.ok) throw Error('API_URL đã sai');

        const data = await res.json();

        return data;
    } catch (err) {
        console.error('Không lấy tìm được sản phẩm');
        throw Error('Không lấy tìm được sản phẩm');
    }
};
