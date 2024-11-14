import { useQuery } from '@tanstack/react-query';
import { getStores } from '../services/apiStore';
import useToken from '../../hooks/useToken';

export default function useStores() {
    const token = useToken();

    const { data: stores, isPending } = useQuery({
        queryFn: (token) => getStores(token),
        queryKey: ['stores'],
    });

    return { stores, isPending };
}
