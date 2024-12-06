import useToken from '../../hooks/useToken';
import { useQuery } from '@tanstack/react-query';
import { getListOrderCancelled } from '../../services/apiOrder';
export default function useOrdersCancelled() {
    const token = useToken();
    const { data: ordersCancelled, isPending: isOrderCancelling } = useQuery({
        queryKey: ['ordersCancelled'],
        queryFn: () => getListOrderCancelled(token),
    });

    return { ordersCancelled, isOrderCancelling };
}
