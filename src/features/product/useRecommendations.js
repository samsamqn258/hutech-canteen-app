import { useQuery } from '@tanstack/react-query';
import useToken from '../../hooks/useToken';
import { getRecommendationsForUser } from '../../services/apiProduct';
export default function useRecommendations() {
    const token = useToken();
    const { data: recommendations, isPending: isRecommending } = useQuery({
        queryKey: ['recommendations'],
        queryFn: () => getRecommendationsForUser(token),
    });

    return { recommendations, isRecommending };
}
