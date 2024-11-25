import { useQuery } from '@tanstack/react-query';
import { getOpeningHours } from '../../../src/services/apiOpeningHour';
import useToken from '../../../src/hooks/useToken';
export default function useOpeningHour(openingHourID) {
    const token = useToken();
    const { data: openingHour, isPending } = useQuery({
        queryKey: ['openingHours', openingHourID],
        queryFn: () => getOpeningHours(openingHourID, token),
    });
    return { openingHour, isPending };
}
