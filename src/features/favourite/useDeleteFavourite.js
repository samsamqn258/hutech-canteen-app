import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { deleteFavorite as deleteFavouriteApi } from '../../services/apiFavourite';
export default function useDeleteFavourite() {
    const queryClient = useQueryClient();
    const { mutate: deleteFavourite, isPending: isDeleting } = useMutation({
        mutationFn: deleteFavouriteApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['favourites']);
            Toast.show({
                type: 'success',
                text1: 'Đã xóa yêu thích thành công',
            });
        },
    });

    return { deleteFavourite, isDeleting };
}
