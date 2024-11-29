import { useQuery } from '@tanstack/react-query';
import { checkoutPreview } from '../../services/apiOrder';
import useToken from '../../hooks/useToken';
export default function useCheckoutPreview() {
    const token = useToken();
    const { data: orders, isPending } = useQuery({
        queryKey: ['orders'],
        queryFn: () => checkoutPreview(token),
    });
    return { orders, isPending };
}
