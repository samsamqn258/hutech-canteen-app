import useToken from '../../hooks/useToken';
import { useQuery } from '@tanstack/react-query';
import { getRated } from '../../services/apiReview';
export default function useRated() {
    const token = useToken();
    const { data: rated, isPending } = useQuery({
        queryKey: ['did-rates'],
        queryFn: () => getRated(token),
    });

    return { rated, isPending };
}
