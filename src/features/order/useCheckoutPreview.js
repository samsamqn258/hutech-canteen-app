import { useQuery } from '@tanstack/react-query';
import { checkoutPreview } from '../../services/apiOrder';
import useToken from '../../hooks/useToken';
import { useLocalSearchParams } from 'expo-router';
export default function useCheckoutPreview() {
    const token = useToken();
    const { discountCode } = useLocalSearchParams();
    const { data: orders, isPending } = useQuery({
        queryKey: ['orders'],
        queryFn: () => checkoutPreview(token, discountCode),
    });
    return { orders, isPending };
}
