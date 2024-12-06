import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder as deleteOrderApi } from '@/src/services/apiOrder';
import Toast from 'react-native-toast-message';

export default function useDeleteOrder() {
    const queryClient = useQueryClient();
    const { isPending: isDeleting, mutate: deleteOrder } = useMutation({
        mutationFn: deleteOrderApi,
        onSuccess: () => {
            queryClient.invalidateQueries(['ordersPending', 'ordersCancelled']);
            Toast.show({ type: 'success', text1: 'Đã xóa đơn hàng thành công' });
        },
    });

    return { deleteOrder, isDeleting };
}
