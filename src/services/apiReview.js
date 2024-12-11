import { API_BASE_URL } from '../constants/url';
const API_URL = `${API_BASE_URL}/review`;

export async function createReview(newReview) {
    const { reviewID, token, review_rating, review_content } = newReview;
    console.log(newReview);
    try {
        const res = await fetch(`${API_URL}/create/${reviewID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                review_rating,
                review_content,
            }),
        });

        if (!res.ok) throw new Error('Đánh giá không thành công');

        const data = await res.json();
        return data.metaData;
    } catch (err) {
        throw new Error('Đánh giá không thành công', err);
    }
}

export async function getNotRate(token) {
    try {
        const res = await fetch(`${API_URL}/orderNotBeenReviewed`, {
            headers: {
                Authorization: token,
            },
        });
        if (!res.ok) throw new Error('API_URL đã sai');

        const data = await res.json();

        return data;
    } catch (err) {
        throw new Error('Không thể lấy danh sách người dùng chưa đánh giá', err);
    }
}

export async function getRated(token) {
    try {
        const res = await fetch(`${API_URL}/listReviews`, {
            headers: {
                Authorization: token,
            },
        });
        if (!res.ok) throw new Error('API_URL đã sai');

        const data = await res.json();

        return data;
    } catch (err) {
        throw new Error('Không thể lấy danh sách người dùng đã đánh giá', err);
    }
}

export async function getReviewById(reviewID, token) {
    try {
        const res = await fetch(`${API_URL}/getReviewById/${reviewID}`, {
            headers: {
                Authorization: token,
            },
        });
        if (!res.ok) throw new Error('API_URL đã sai');

        const data = await res.json();

        return data;
    } catch (err) {
        throw new Error('Không thể lấy chi tiết đánh giá', err);
    }
}
