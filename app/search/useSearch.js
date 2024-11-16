import { useQuery } from '@tanstack/react-query';
import { searchProduct } from '../services/apiProduct';
import useToken from '../../hooks/useToken';
import { useLocalSearchParams } from 'expo-router';
export default function useSearch() {
    const token = useToken();
    const { query } = useLocalSearchParams();
    const { data: products, isPending } = useQuery({
        queryKey: ['products', query],
        queryFn: () => searchProduct(query, token),
        enabled: !!query,
    });
    return { isPending, products };
}