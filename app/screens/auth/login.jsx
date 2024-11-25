import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import BackButton from '@/src/components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '@/src/helpers/common';
import { theme } from '@/src/constants/theme';

import Fontisto from '@expo/vector-icons/Fontisto';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Button from '@/src/components/Button';
import Select from '@/src/components/Select';
import FooterRow from '@/src/components/FooterRow';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '@/src/components/Error';
import useLogin from '../../../src/features/auth/useLogin';

import Loading from '@/src/components/Loading';
import Input from '@/src/components/Input';
import useStores from '../store/useStores';

// Schema
const validationSchema = Yup.object().shape({
    email: Yup.string().required('Vui lòng nhập email').email().label('Email'),
    password: Yup.string().required('Vui lòng nhập mật khẩu').min(6).label('Mật khẩu'),
});

const Login = () => {
    const router = useRouter();
    const { stores, isPending } = useStores();
    const [selectedShop, setSelectedShop] = useState('');
    const { login, isPending: isLogin } = useLogin();
    const isLoading = isLogin || isPending;

    if (isLoading) return <Loading />;

    const shopOptions = stores?.metaData?.map((store) => ({
        label: store.shop_name,
        value: store._id,
    }));

    console.log(selectedShop);
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />

                <View>
                    <Text style={styles.welcomeText}>Chào,</Text>
                    <Text style={styles.welcomeText}>Bạn Đã Trở Lại</Text>
                </View>
                <Formik
                    initialValues={{
                        email: 'toan@gmail.com',
                        password: '123456',
                    }}
                    onSubmit={(values) =>
                        login({
                            email: values.email,
                            password: values.password,
                            selectedShop,
                        })
                    }
                    validationSchema={validationSchema}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.form}>
                            <Text
                                style={{
                                    fontSize: hp(1.6),
                                    color: theme.colors.text,
                                    fontWeight: theme.fonts.semibold,
                                }}>
                                Vui lòng đăng nhập để tiếp tục
                            </Text>
                            <View>
                                <Input
                                    type="input"
                                    icon={
                                        <Fontisto
                                            name="email"
                                            size={24}
                                            color={theme.colors.text}
                                        />
                                    }
                                    placeholder="Nhập địa chỉ Email..."
                                    onChange={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {/* Error */}
                                {errors.email && touched.email && <Error error={errors.email} />}
                            </View>
                            <View>
                                <Input
                                    type="input"
                                    icon={
                                        <EvilIcons
                                            name="lock"
                                            size={24}
                                            color={theme.colors.text}
                                        />
                                    }
                                    secureTextEntry={true}
                                    placeholder="Nhập mật khẩu..."
                                    onChange={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    keyboardType="email-address"
                                />
                                {/* Error */}
                                {errors.password && touched.password && (
                                    <Error error={errors.password} />
                                )}
                            </View>

                            <Text
                                style={{
                                    fontSize: hp(1.6),
                                    color: theme.colors.text,
                                    fontWeight: theme.fonts.semibold,
                                }}>
                                Vui lòng chọn địa chỉ căn tin
                            </Text>

                            <Select
                                options={shopOptions}
                                onChange={(value) => setSelectedShop(value)}
                                value={selectedShop}
                            />

                            <Pressable onPress={() => router.push('/screens/auth/forgotPassword')}>
                                <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                            </Pressable>
                            <Button title="Đăng nhập" loading={isLoading} onPress={handleSubmit} />
                        </View>
                    )}
                </Formik>
                <FooterRow>
                    <Text style={styles.footerText}>Bạn chưa có tài khoản?</Text>
                    <Pressable onPress={() => router.push('/screens/auth/register')}>
                        <Text
                            style={[
                                styles.footerText,
                                {
                                    color: theme.colors.primary,
                                    fontWeight: theme.fonts.semibold,
                                },
                            ]}>
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
        gap: 40,
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
