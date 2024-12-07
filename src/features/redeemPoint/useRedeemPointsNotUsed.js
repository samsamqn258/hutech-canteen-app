import { getRedeemPointsNotUsed } from '../../services/apiRedeemPoint';
import useToken from '../../hooks/useToken';
import { useQuery } from '@tanstack/react-query';
export default function useRedeemPointsNotUsed() {
    const token = useToken();
    const { data: redeemPointsNotUsed, isPending } = useQuery({
        queryKey: ['redeemPointsNotUsed'],
        queryFn: () => getRedeemPointsNotUsed(token),
    });

    return { redeemPointsNotUsed, isPending };
}
