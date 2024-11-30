import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { addToCart as addToCartApi } from '../../services/apiShoppingCart';
export default function useAddToCart() {
    const queryClient = useQueryClient();
    const { mutate: addToCart, isPending: isAdding } = useMutation({
        mutationFn: addToCartApi,
        mutationKey: ['carts', 'add'],
        onSuccess: (cart, product) => {
            queryClient.invalidateQueries(['carts']);
            Toast.show({ type: 'success', text1: 'Thêm vào giỏ hàng thành công' });
        },
        onError: () => {
            Toast.show({ type: 'error', text1: 'Thêm vào giỏ hàng không thành công' });
        },
    });
    return { addToCart, isAdding };
}
