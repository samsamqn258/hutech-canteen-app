import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFromCart as deleteFromCartApi } from '../../services/apiShoppingCart';
import Toast from 'react-native-toast-message';
export default function useDeleteFromCart() {
    const queryClient = useQueryClient();
    const { mutate: deleteFromCart, isPending: isDeleting } = useMutation({
        mutationFn: deleteFromCartApi,
        onSuccess: () => {
            queryClient.invalidateQueries(['carts']);
            Toast.show({
                type: 'success',
                text1: 'Đã xóa sản phẩm khỏi giỏ hàng thành công',
            });
        },
    });

    return { deleteFromCart, isDeleting };
}
