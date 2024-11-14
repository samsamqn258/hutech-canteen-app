import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/apiCategory';

export default function useCategories() {
    const { isPending, data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    return { isPending, categories };
}
