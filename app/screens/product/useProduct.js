import { useQuery } from '@tanstack/react-query';
import useToken from '../../../src/hooks/useToken';
import { getProduct } from '../../../src/services/apiProduct';
export default function useProduct(productID) {
    console.log(productID);
    const token = useToken();

    const { data: product, isPending } = useQuery({
        queryKey: ['product', productID],
        queryFn: () => getProduct(productID, token),
        enabled: !!productID,
    });

    return { product, isPending };
}
