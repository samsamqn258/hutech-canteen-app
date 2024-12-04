import { useQuery } from '@tanstack/react-query';
import { getStoresWithLocation } from '../../../src/services/apiStore';
import useToken from '../../../src/hooks/useToken';

export default function useMapStores() {
    const token = useToken();
    const { data: mapStores, isPending: isMapStoring } = useQuery({
        queryKey: ['mapStores'],
        queryFn: () => getStoresWithLocation(token),
    });

    return { mapStores, isMapStoring };
}
