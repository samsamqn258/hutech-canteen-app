import { API_BASE_URL } from '../../src/constants/url';

const API_URL = `${API_BASE_URL}/openningHours`;

export const getOpeningHours = async (openHourID, token) => {
    try {
        const res = await fetch(`${API_URL}/getById/${openHourID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        if (!res.ok) throw Error(`Không thể lấy được giờ hoạt động ${openHourID}`);

        const data = await res.json();

        return data;
    } catch (e) {
        console.error('Không thể lấy được giờ hoạt động', e);
        throw new Error('Không thể lấy được giờ hoạt động', e);
    }
};
