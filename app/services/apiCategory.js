import { API_BASE_URL } from '../../constants/url';
const API_URL = `${API_BASE_URL}/category`;

export const getCategories = async () => {
    try {
        const res = await fetch(`${API_URL}/all`);
        if (!res.ok) throw Error('Không lấy được danh sách danh mục');
        const data = await res.json();
        return data;
    } catch (e) {
        console.error('Không lấy được danh sách danh mục');
        throw new Error('Không lấy được danh sách danh mục');
    }
};
