import { API_BASE_URL } from '../../src/constants/url';
const API_URL = `${API_BASE_URL}/RedeemPoints`;

export async function createRedeemPoints(newProduct) {
    const { productID, token } = newProduct;
    console.log(newProduct);
    try {
        const res = await fetch(`${API_URL}/create/${productID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        if (!res.ok) throw new Error('Điểm của bạn không đủ để đổi sản phẩm');

        const data = await res.json();
        return data.metaData;
    } catch (err) {
        throw new Error('Không thể đổi sản phẩm thành công', err);
    }
}

export async function getRedeemPointsNotUsed(token) {
    try {
        const res = await fetch(`${API_URL}/getRedeemPointsNotUsed`, {
            headers: {
                Authorization: token,
            },
        });
        if (!res.ok) throw new Error('API_URL đã sai');

        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        throw new Error('Không thể lấy danh sách người dùng chưa đổi điểm', err);
    }
}

export async function getRedeemPointsUsed(token) {
    try {
        const res = await fetch(`${API_URL}/getRedeemPointsUsed`, {
            headers: {
                Authorization: token,
            },
        });
        if (!res.ok) throw new Error('API_URL đã sai');

        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        throw new Error('Không thể lấy danh sách người dùng đã đổi điểm', err);
    }
}
