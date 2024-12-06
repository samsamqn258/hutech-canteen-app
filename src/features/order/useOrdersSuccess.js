import useToken from '../../hooks/useToken';
import { useQuery } from '@tanstack/react-query';
import { getListOrderSuccess } from '../../services/apiOrder';
export default function useOrdersSuccess() {
    const token = useToken();
    const { data: ordersSuccess, isPending: isOrderSucceeding } = useQuery({
        queryKey: ['ordersSuccess'],
        queryFn: () => getListOrderSuccess(token),
    });

    return { ordersSuccess, isOrderSucceeding };
}
