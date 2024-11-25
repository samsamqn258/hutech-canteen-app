import { getProductsInCategory } from '../../../src/services/apiProduct';
import useToken from '../../../src/hooks/useToken';
import { useQuery } from '@tanstack/react-query';
export default function useProductsInCategory(categoryID) {
    const token = useToken();

    const { isPending, data: products } = useQuery({
        queryFn: () => getProductsInCategory(categoryID, token),
        queryKey: ['products', categoryID],
    });

    return { isPending, products };
}
