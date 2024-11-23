import { API_BASE_URL } from '../../src/constants/url';
const API_URL = `${API_BASE_URL}/favorite`;

export async function getFavorites(token) {
    try {
        const res = await fetch(`${API_URL}/getFavorites`, {
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
    } catch (e) {
        console.error('Không lấy được danh sách yêu thích', e);
        throw new Error('Không lấy được danh sách yêu thích');
    }
}

export async function addFavorite(newFavorite) {
    const { product_id, token } = newFavorite;
    try {
        const res = await fetch(`${API_URL}/addFavorite/${product_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        if (!res.ok) throw new Error('Không thể thêm vào danh mục yêu thích');
    } catch (e) {
        console.error('Không thể thêm vào danh mục yêu thích', e);
        throw new Error('Không thể thêm vào danh mục yêu thích', e);
    }
}

export async function deleteFavorite(deleteFavorite) {
    const { product_id, token } = deleteFavorite;
    console.log(product_id, token);
    try {
        const res = await fetch(`${API_URL}/deleteFavorite/${product_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        if (!res.ok) throw new Error('Không thể xóa sản phẩm được yêu thích');
    } catch (e) {
        console.error('Không thể xóa sản phẩm được yêu thích', e);
        throw new Error('Không thể xóa sản phẩm được yêu thích', e);
    }
}
