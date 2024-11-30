import { useQuery } from '@tanstack/react-query';
import { checkoutPreview } from '../../services/apiOrder';
import useToken from '../../hooks/useToken';
import { useLocalSearchParams } from 'expo-router';
export default function useCheckoutPreview() {
    const token = useToken();
    const { discountCode } = useLocalSearchParams();
    console.log(discountCode);
    const { data: orders, isPending } = useQuery({
        queryKey: ['orders', discountCode],
        queryFn: () => checkoutPreview(token, discountCode),
    });
    return { orders, isPending };
}
