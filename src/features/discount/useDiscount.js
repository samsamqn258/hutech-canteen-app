import { useQuery } from '@tanstack/react-query';
import useToken from '../../hooks/useToken';
import { getDiscount } from '../../services/apiDiscount';
import { useLocalSearchParams } from 'expo-router';

export default function useDiscount() {
    const token = useToken();
    const { discountID } = useLocalSearchParams();

    const { data: discount, isPending: isDiscounting } = useQuery({
        queryKey: ['discounts', discountID],
        queryFn: () => getDiscount(discountID, token),
        enabled: !!discountID,
    });

    return { discount, isDiscounting };
}
