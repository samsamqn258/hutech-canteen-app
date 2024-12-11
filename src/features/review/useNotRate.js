import useToken from '../../hooks/useToken';
import { useQuery } from '@tanstack/react-query';
import { getNotRate } from '../../services/apiReview';
export default function useNotRate() {
    const token = useToken();
    const { data: notRate, isPending } = useQuery({
        queryKey: ['not-rates'],
        queryFn: () => getNotRate(token),
    });

    return { notRate, isPending };
}
