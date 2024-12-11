import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview as createReviewApi } from '../../services/apiReview';
import Toast from 'react-native-toast-message';
export default function useCreateRate() {
    const queryClient = useQueryClient();
    const { mutate: createRate, isPending: isCreating } = useMutation({
        mutationFn: createReviewApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['not-rates']);
            queryClient.invalidateQueries(['did-rates']);

            Toast.show({
                type: 'success',
                text1: 'Đánh giá thành công',
            });
        },

        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Đánh giá không thành công',
            });
        },
    });

    return { createRate, isCreating };
}
