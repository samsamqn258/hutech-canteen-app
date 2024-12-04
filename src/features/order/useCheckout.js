import { useMutation } from '@tanstack/react-query';
import { checkout as checkoutApi } from '../../services/apiOrder';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';
export default function useCheckout() {
    const { mutate: checkout, isPending: isCheckouting } = useMutation({
        mutationFn: checkoutApi,

        onError: (err) => {
            Alert.alert('Không hợp lệ', err.message);
        },
    });

    return { checkout, isCheckouting };
}
