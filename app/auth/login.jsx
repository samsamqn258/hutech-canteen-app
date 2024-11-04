import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import BackButton from '@/components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '@/helpers/common';
import { theme } from '@/constants/theme';
import Input from '@/components/Input';
import Fontisto from '@expo/vector-icons/Fontisto';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Button from '@/components/Button';
import Select from '@/components/Select';
import FooterRow from '@/components/FooterRow';

const Login = () => {
    const router = useRouter();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [selectedShop, setSelectedShop] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    console.log(emailRef, passwordRef, selectedShop);
    const onSubmit = () => {
        router.push('/tabs/home');
    };
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />

                <View>
                    <Text style={styles.welcomeText}>Chào,</Text>
                    <Text style={styles.welcomeText}>Bạn Đã Trở Lại</Text>
                </View>

                <View style={styles.form}>
                    <Text
                        style={{
                            fontSize: hp(1.6),
                            color: theme.colors.text,
                            fontWeight: theme.fonts.semibold,
                        }}
                    >
                        Vui lòng đăng nhập để tiếp tục
                    </Text>
                    <Input
                        icon={
                            <Fontisto
                                name="email"
                                size={24}
                                color={theme.colors.text}
                            />
                        }
                        placeholder="Nhập địa chỉ Email..."
                        onChange={(value) => (emailRef.current = value)}
                    />
                    <Input
                        icon={
                            <EvilIcons
                                name="lock"
                                size={24}
                                color={theme.colors.text}
                            />
                        }
                        secureTextEntry={true}
                        placeholder="Nhập mật khẩu..."
                        onChange={(value) => (passwordRef.current = value)}
                    />

                    <Text
                        style={{
                            fontSize: hp(1.6),
                            color: theme.colors.text,
                            fontWeight: theme.fonts.semibold,
                        }}
                    >
                        Vui lòng chọn địa chỉ căn tin
                    </Text>

                    <Select
                        options={[
                            { label: 'Chi nhánh khu A/B', value: 'A/B' },
                            { label: 'Chi nhánh khu U', value: 'U' },
                            { label: 'Chi nhánh khu R', value: 'R' },
                            { label: 'Chi nhánh khu E', value: 'E' },
                        ]}
                        onChange={(value) => setSelectedShop(value)}
                        value={selectedShop}
                    />
                    <Pressable
                        onPress={() => router.push('auth/forgotPassword')}
                    >
                        <Text style={styles.forgotPassword}>
                            Quên mật khẩu?
                        </Text>
                    </Pressable>
                    <Button
                        title="Đăng nhập"
                        loading={isLoading}
                        onPress={onSubmit}
                    />
                </View>

                <FooterRow>
                    <Text style={styles.footerText}>
                        Bạn chưa có tài khoản?
                    </Text>
                    <Pressable onPress={() => router.push('auth/signUp')}>
                        <Text
                            style={[
                                styles.footerText,
                                {
                                    color: theme.colors.primary,
                                    fontWeight: theme.fonts.semibold,
                                },
                            ]}
                        >
                            Đăng ký
                        </Text>
                    </Pressable>
                </FooterRow>
            </View>
        </ScreenWrapper>
    );
};

export default Login;

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
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text,
    },

    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6),
    },
});
