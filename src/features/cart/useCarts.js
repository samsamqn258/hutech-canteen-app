import { useQuery } from '@tanstack/react-query';
import useToken from '../../hooks/useToken';
import { getCarts } from '../../services/apiShoppingCart';
export default function useCarts() {
    const token = useToken();
    const { data: carts, isPending } = useQuery({
        queryKey: ['carts'],
        queryFn: () => getCarts(token),
    });

    return { carts, isPending };
}
