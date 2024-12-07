import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../src/services/apiProduct';
export default function useProducts() {
    const { data: products, isPending } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    return { products, isPending };
}
