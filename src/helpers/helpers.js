import moment from 'moment';

export const formatCurrency = (value) =>
    new Intl.NumberFormat('vn', { style: 'currency', currency: 'VND' }).format(value);

export const formattedTime = (value) => moment(value).format('HH:mm - DD/MM/YYYY');
