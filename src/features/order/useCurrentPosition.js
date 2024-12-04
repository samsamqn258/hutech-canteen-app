import { useQuery } from '@tanstack/react-query';
import { getCurrentPosition } from '../../services/apiOrder';
export default function useCurrentPosition() {
    const { data: position, isPending: isPositing } = useQuery({
        queryKey: ['currentPosition'],
        queryFn: getCurrentPosition,
    });

    return { position, isPositing };
}
