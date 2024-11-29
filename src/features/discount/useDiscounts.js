import { useQuery } from '@tanstack/react-query';
import { getDiscounts } from '../../services/apiDiscount';

export default function useDiscounts() {
    const { data: discounts, isPending } = useQuery({
        queryKey: ['discounts'],
        queryFn: getDiscounts,
    });

    return { discounts, isPending };
}
