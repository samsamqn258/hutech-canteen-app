import { useQuery } from '@tanstack/react-query';
import useToken from '../../hooks/useToken';
import { useLocalSearchParams } from 'expo-router';
import { getReviewById } from '../../services/apiReview';
export default function useRate() {
    const token = useToken();
    const { reviewID } = useLocalSearchParams();

    const { data: review, isPending } = useQuery({
        queryKey: [reviewID],
        queryFn: () => getReviewById(reviewID, token),
        enabled: !!reviewID,
    });

    return { review, isPending };
}
