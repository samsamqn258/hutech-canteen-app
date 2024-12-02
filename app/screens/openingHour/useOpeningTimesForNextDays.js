import { useQuery } from '@tanstack/react-query';
import { getOpeningTimesForNextDays } from '../../../src/services/apiOpeningHour';
import useToken from '@/src/hooks/useToken';

export default function useOpeningTimesForNextDays() {
    const token = useToken();
    const { data: openingTimesForNextDays, isPending: isOpening } = useQuery({
        queryKey: ['openingTimesForNextDays'],
        queryFn: () => getOpeningTimesForNextDays(token),
    });

    return { openingTimesForNextDays, isOpening };
}
