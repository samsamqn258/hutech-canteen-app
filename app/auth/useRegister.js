import { useMutation } from '@tanstack/react-query';
import { register as registerApi } from '../services/apiAuth';

import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
export default function useLogin() {
    const { mutate: register, isPending } = useMutation({
        mutationFn: ({ email, password, name }) =>
            registerApi({ email: email, password: password, name }),
        mutationKey: ['register'],
        onError: () => {
            Toast.show({
                type: 'error',
                text1: 'Tài khoản đã tồn tại',
            });
        },
        onSuccess: (data) => {
            router.push('/auth/login');
            Toast.show({
                type: 'success',
                text1: 'Đăng ký thành công',
            });
        },
    });

    return { register, isPending };
}
