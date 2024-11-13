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
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '@/components/Error';
import AntDesign from '@expo/vector-icons/AntDesign';
import useRegister from '../auth/useRegister';
// Schema
const validationSchema = Yup.object().shape({
    email: Yup.string().required('Vui lòng nhập email').email().label('Email'),
    password: Yup.string()
        .required('Vui lòng nhập mật khẩu')
        .min(6)
        .label('Mật khẩu'),
    name: Yup.string().required('Vui lòng nhập họ và tên').label('Tên'),
});

const SignUp = () => {
    const router = useRouter();
    const { register, isPending } = useRegister();
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />

                <View>
                    <Text style={styles.welcomeText}>Hãy,</Text>
                    <Text style={styles.welcomeText}>Bắt Đầu Nào</Text>
                </View>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) =>
                        register({
                            email: values.email,
                            password: values.password,
                            name: values.name,
                        })
                    }
                    validationSchema={validationSchema}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <View style={styles.form}>
                            <Text
                                style={{
                                    fontSize: hp(1.6),
                                    color: theme.colors.text,
                                    fontWeight: theme.fonts.semibold,
                                }}
                            >
                                Vui lòng nhập đầy đủ thông tin để đăng ký
                            </Text>
                            <View>
                                <Input
                                    type="input"
                                    icon={
                                        <AntDesign
                                            name="user"
                                            size={24}
                                            color={theme.colors.text}
                                        />
                                    }
                                    placeholder="Nhập họ và tên..."
                                    onChange={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                {/* Error */}
                                {errors.name && touched.name && (
                                    <Error error={errors.name} />
                                )}
                            </View>
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
                                {errors.email && touched.email && (
                                    <Error error={errors.email} />
                                )}
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
                                    secureTextEntry
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

                            <Button
                                title="Đăng ký"
                                loading={isPending}
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>

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
        gap: 20,
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
