import { useQuery } from '@tanstack/react-query';
import useToken from '../../../src/hooks/useToken';
import { getStore } from '../../../src/services/apiStore';
import { useLocalSearchParams } from 'expo-router';

export default function useStore() {
    const token = useToken();
    const { shopID } = useLocalSearchParams();

    const { data: store, isPending } = useQuery({
        queryKey: ['stores', shopID],
        queryFn: () => getStore(shopID, token),
        enabled: !!shopID,
    });

    return { store, isPending };
}
