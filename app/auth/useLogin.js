import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../services/apiAuth';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { loginUserAction } from './authSlice';
import { router } from 'expo-router';
export default function useLogin() {
    const dispatch = useDispatch();
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password, selectedShop }) =>
            loginApi({ email, password, selectedShop }),
        mutationKey: ['login'],
        onSuccess: (data) => {
            if (data) {
                dispatch(loginUserAction(data));
                router.push('/(tabs)/home');
                Toast.show({
                    type: 'success',
                    text1: 'Đăng nhập thành công',
                });
            }
            return;
        },
        onError: () => {
            Toast.show({
                type: 'error',
                text1: 'Sai mật khẩu hoặc tài khoản',
            });
        },
    });

    return { login, isPending };
}
