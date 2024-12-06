import { useQuery } from '@tanstack/react-query';
import useToken from '../../hooks/useToken';
import { getListOrderPending } from '../../services/apiOrder';
export default function useOrdersPending() {
    const token = useToken();
    const { data: ordersPending, isPending: isOrderPending } = useQuery({
        queryKey: ['ordersPending'],
        queryFn: () => getListOrderPending(token),
    });

    return { ordersPending, isOrderPending };
}
