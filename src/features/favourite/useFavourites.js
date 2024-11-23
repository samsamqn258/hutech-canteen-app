import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '../../services/apiFavourite';
import useToken from '../../hooks/useToken';
export default function useFavourites() {
    const token = useToken();
    const { data: favorites, isPending } = useQuery({
        queryKey: ['favourites'],
        queryFn: () => getFavorites(token),
    });

    return { favorites, isPending };
}
