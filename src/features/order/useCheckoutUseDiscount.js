import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkoutPreview } from '../../services/apiOrder';
import Toast from 'react-native-toast-message';
import useToken from '../../hooks/useToken';
import { Alert } from 'react-native';

export default function useCheckoutUseDiscount() {
    const token = useToken();
    const queryClient = useQueryClient();
    const { mutate: checkoutUseDiscount, isPending: isCheckoutUseDiscounting } = useMutation({
        mutationFn: ({ discountCode }) => {
            if (!discountCode) throw new Error('Mã giảm giá không hợp lệ');
            return checkoutPreview(token, discountCode);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
            Toast.show({ type: 'success', text1: 'Đã áp dụng mã giảm giá thành công' });
        },
        onError: (err) => {
            Alert.alert('Có lỗi', err.message);
        },
    });

    return { checkoutUseDiscount, isCheckoutUseDiscounting };
}
