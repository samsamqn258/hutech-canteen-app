import { useLocalSearchParams } from 'expo-router';
import useToken from '../../hooks/useToken';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '@/src/services/apiOrder';

export default function useOrder() {
    const { orderID } = useLocalSearchParams();
    console.log(orderID);
    const token = useToken();
    const { isPending: isOrdering, data: order } = useQuery({
        queryKey: ['orders', orderID],
        queryFn: () => getOrder(orderID, token),
    });

    return { order, isOrdering };
}
