import { API_BASE_URL } from '../../constants/url';
const API_URL = `${API_BASE_URL}/product`;

export const getProductsInCategory = async (categoryID, token) => {
    console.log('API', categoryID, token);
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
        console.log(data);
        return data;
    } catch (err) {
        console.error('Không lấy được danh sách sản phẩm trong danh mục');
        throw Error('Không lấy được danh sách sản phẩm trong danh mục');
    }
};
