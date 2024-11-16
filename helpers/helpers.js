export const formatCurrency = (value) =>
  new Intl.NumberFormat('vn', { style: 'currency', currency: 'VND' }).format(value);
