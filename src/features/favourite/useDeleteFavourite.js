import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { deleteFavorite as deleteFavouriteApi } from '../../services/apiFavourite';
export default function useDeleteFavourite() {
    const { mutate: deleteFavourite, isPending: isDeleting } = useMutation({
        mutationFn: deleteFavouriteApi,
        mutationKey: ['favourite'],
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Đã xóa yêu thích thành công',
            });
        },
    });

    return { deleteFavourite, isDeleting };
}
