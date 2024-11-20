import { useQuery } from '@tanstack/react-query';
import useToken from '../../../src/hooks/useToken';
import { getStore } from '../../../src/services/apiStore';

export default function useStore(shopID) {
    const token = useToken();

    const { data: store, isPending } = useQuery({
        queryKey: ['store'],
        queryFn: () => getStore(shopID, token),
        enabled: !!shopID,
    });

    return { store, isPending };
}
