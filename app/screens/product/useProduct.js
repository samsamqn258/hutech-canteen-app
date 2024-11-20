import { useQuery } from '@tanstack/react-query';
import useToken from '../../../src/hooks/useToken';
import { getProduct } from '../../../src/services/apiProduct';
export default function useProduct(productID) {
    const token = useToken();
    console.log(productID);
    const { data: product, isPending } = useQuery({
        queryKey: ['product', productID],
        queryFn: () => getProduct(productID, token),
        enabled: !!productID,
    });

    return { product, isPending };
}
