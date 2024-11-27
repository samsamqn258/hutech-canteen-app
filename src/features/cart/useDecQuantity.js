import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DecProductQuantity as DecProductQuantityApi } from '../../services/apiShoppingCart';
import Toast from 'react-native-toast-message';
export default function useDecQuantity() {
    const queryClient = useQueryClient();
    const { mutate: DecProductQuantity, isPending: isDecreasing } = useMutation({
        mutationFn: DecProductQuantityApi,
        mutationKey: ['dec_product_quantity'],
        onSuccess: (data) => {
            queryClient.invalidateQueries(['carts']);
        },
    });

    return { DecProductQuantity, isDecreasing };
}
