import { StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import BackButton from '@/src/components/BackButton';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { hp, wp } from '@/src/helpers/common';
import { theme } from '@/src/constants/theme';

const ForgotPassword = () => {
    const router = useRouter();
    const emailRef = useRef('');
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = () => {};
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />

                <View>
                    <Text style={styles.welcomeText}>Quên Mật Khẩu</Text>
                </View>

                <View style={styles.form}>
                    <Text
                        style={{
                            fontSize: hp(1.6),
                            color: theme.colors.text,
                            fontWeight: theme.fonts.semibold,
                        }}>
                        Vui lòng nhập Email để lấy lại mật khẩu
                    </Text>
                    <Input
                        type="input"
                        icon={<Fontisto name="email" size={24} color={theme.colors.text} />}
                        placeholder="Nhập địa chỉ Email..."
                        onChange={(value) => (emailRef.current = value)}
                    />
                    <Button title="Xác nhận" loading={isLoading} onPress={onSubmit} />
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
    },
    form: {
        gap: 20,
    },
});
