import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRedeemPoints as createRedeemPointApi } from '../../services/apiRedeemPoint';
import Toast from 'react-native-toast-message';
export default function useCreateRedeemPoint() {
    const queryClient = useQueryClient();
    const { mutate: createRedeemPoint, isPending: isCreating } = useMutation({
        mutationFn: createRedeemPointApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['user']);
            Toast.show({
                type: 'success',
                text1: `${data.redeem_content} `,
                text2: `với giá ${data.redeem_points} điểm`,
            });
        },

        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Hiện bạn không đủ điểm để đổi sản phẩm này',
            });
        },
    });

    return { createRedeemPoint, isCreating };
}
