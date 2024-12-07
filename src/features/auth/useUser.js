import { useQuery } from '@tanstack/react-query';
import useToken from '../../hooks/useToken';
import { getUser } from '@/src/services/apiAuth';
export default function useUser() {
    const token = useToken();
    const { data: user, isPending } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token),
    });
    return { user, isPending };
}
