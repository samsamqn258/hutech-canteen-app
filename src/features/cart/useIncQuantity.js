import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IncProductQuantity as IncProductQuantityApi } from '../../services/apiShoppingCart';
export default function useIncQuantity() {
    const queryClient = useQueryClient();
    const { mutate: IncProductQuantity, isPending: isIncreasing } = useMutation({
        mutationFn: IncProductQuantityApi,
        mutationKey: ['inc_product_quantity'],
        onSuccess: () => {
            queryClient.invalidateQueries(['carts']);
        },
    });
    return { IncProductQuantity, isIncreasing };
}
