import { useQuery } from '@tanstack/react-query';
import { getStores } from '../../../src/services/apiStore';

export default function useStores() {
    const { data: stores, isPending } = useQuery({
        queryFn: getStores,
        queryKey: ['stores'],
    });

    return { stores, isPending };
}
