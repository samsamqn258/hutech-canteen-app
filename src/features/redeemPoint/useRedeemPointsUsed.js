import { getRedeemPointsUsed } from '../../services/apiRedeemPoint';
import useToken from '../../hooks/useToken';
import { useQuery } from '@tanstack/react-query';
export default function useRedeemPointsUsed() {
    const token = useToken();
    const { data: redeemPointsUsed, isPending } = useQuery({
        queryKey: ['redeemPointsUsed'],
        queryFn: () => getRedeemPointsUsed(token),
    });

    return { redeemPointsUsed, isPending };
}
