import useToken from '../../hooks/useToken';
import { useQuery } from '@tanstack/react-query';
import { getListOrderCompleted } from '../../services/apiOrder';
export default function useOrdersCompleted() {
    const token = useToken();
    const { data: ordersCompleted, isPending: isOrderCompleting } = useQuery({
        queryKey: ['ordersCompleted'],
        queryFn: () => getListOrderCompleted(token),
    });

    return { ordersCompleted, isOrderCompleting };
}
