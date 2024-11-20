import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../../src/services/apiCategory';

export default function useCategories() {
    const { isPending, data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    return { isPending, categories };
}
