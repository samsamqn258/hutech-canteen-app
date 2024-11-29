import { useQuery } from '@tanstack/react-query';
import { getDiscounts } from '../../services/apiDiscount';
import useToken from '../../hooks/useToken';
export default function useDiscounts() {
    const token = useToken();
    const { data: discounts, isPending } = useQuery({
        queryKey: ['discounts'],
        queryFn: () => getDiscounts(token),
    });

    return { discounts, isPending };
}
