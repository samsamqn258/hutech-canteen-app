import { getProductsInCategory } from '../services/apiProduct';
import useToken from '../../hooks/useToken';
import { useQuery } from '@tanstack/react-query';
export default function useProductsInCategory(categoryID) {
  const token = useToken();

  const { isPending, data: products } = useQuery({
    queryFn: () => getProductsInCategory(categoryID, token),
    queryKey: ['productsInCategory', categoryID],
  });

  return { isPending, products };
}
