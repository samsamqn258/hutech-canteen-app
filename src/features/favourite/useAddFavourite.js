import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { addFavorite as addFavouriteApi } from '../../services/apiFavourite';
export default function useAddFavourite() {
    const queryClient = useQueryClient();
    const { mutate: addFavourite, isPending: isFavouriting } = useMutation({
        mutationFn: addFavouriteApi,

        onSuccess: (data) => {
            queryClient.invalidateQueries(['products']);
            Toast.show({
                type: 'success',
                text1: 'Thêm vào danh sách yêu thích thành công',
            });
        },
        onError: () => {
            Toast.show({
                type: 'error',
                text1: 'Thêm vào danh sách yêu thích thất bại',
            });
        },
    });

    return { addFavourite, isFavouriting };
}
