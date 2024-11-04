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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Button from '@/components/Button';
import Select from '@/components/Select';
import FooterRow from '@/components/FooterRow';

const SignUp = () => {
    const router = useRouter();
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = () => {};
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />

                <View>
                    <Text style={styles.welcomeText}>Hãy,</Text>
                    <Text style={styles.welcomeText}>Bắt Đầu Nào</Text>
                </View>

                <View style={styles.form}>
                    <Text
                        style={{
                            fontSize: hp(1.6),
                            color: theme.colors.text,
                            fontWeight: theme.fonts.semibold,
                        }}
                    >
                        Vui lòng điền đầy đủ thông tin để tạo tài khoản
                    </Text>
                    <Input
                        icon={
                            <FontAwesome
                                name="user-o"
                                size={24}
                                color={theme.colors.text}
                            />
                        }
                        placeholder="Nhập họ tên của bạn..."
                        onChange={(value) => (nameRef.current = value)}
                    />
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

                    <Button
                        title="Đăng ký"
                        loading={isLoading}
                        onPress={onSubmit}
                    />
                </View>

                <FooterRow>
                    <Text style={styles.footerText}>
                        Bạn bạn đã có tài khoản?
                    </Text>
                    <Pressable onPress={() => router.push('auth/login')}>
                        <Text
                            style={[
                                styles.footerText,
                                {
                                    color: theme.colors.primary,
                                    fontWeight: theme.fonts.semibold,
                                },
                            ]}
                        >
                            Đăng nhập
                        </Text>
                    </Pressable>
                </FooterRow>
            </View>
        </ScreenWrapper>
    );
};

export default SignUp;

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
        gap: 25,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6),
    },
});
