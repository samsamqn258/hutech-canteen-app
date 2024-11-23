import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { addFavorite as addFavouriteApi } from '../../services/apiFavourite';
export default function useAddFavourite() {
    const { mutate: addFavourite, isPending: isFavouriting } = useMutation({
        mutationFn: addFavouriteApi,
        mutationKey: ['favourite'],
        onSuccess: (data) => {
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
