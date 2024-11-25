import { useQuery } from '@tanstack/react-query';
import useToken from '../../../src/hooks/useToken';
import { getProduct } from '../../../src/services/apiProduct';
import { useLocalSearchParams } from 'expo-router';
export default function useProduct() {
    const token = useToken();
    const { productID } = useLocalSearchParams();

    const { data: product, isPending } = useQuery({
        queryKey: ['products', productID],
        queryFn: () => getProduct(productID, token),
        enabled: !!productID,
    });

    console.log('Dữ liệu từ react query', product);
    return { product, isPending };
}
