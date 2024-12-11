import Toast from 'react-native-toast-message';
import { updateUser as updateUserApi } from '../../services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: updateUserApi,
        onSuccess: ({ user }) => {
            queryClient.invalidateQueries(['users']);
            Toast.show({ type: 'success', text1: 'Cập nhật thành công' });
        },
    });

    return { updateUser, isUpdating };
}
