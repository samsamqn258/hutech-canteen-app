import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import FooterRow from '@/components/FooterRow';
const Welcome = () => {
    const router = useRouter();
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                {/* Welcome image */}
                <Image
                    style={styles.welcomeImage}
                    resizeMode="contain"
                    source={require('../../assets/images/welcome.png')}
                />
                {/* Title */}
                <View style={{ gap: 20 }}>
                    <Text style={styles.title}>Hutech Canteen!</Text>
                    <Text style={styles.punchline}>
                        Nơi mọi có thể đặt bất cứ món ăn nào mà không cần phải
                        rời vị trí chỗ ngồi của mình.
                    </Text>
                </View>
                {/* Footer */}
                <View style={styles.footer}>
                    <Button
                        title="Hãy Bắt Đầu"
                        buttonStyle={{ marginHorizontal: wp(3) }}
                        onPress={() => router.push('/auth/register')}
                    />
                    <FooterRow>
                        <Text style={styles.loginText}>
                            Bạn đã có tài khoản?
                        </Text>
                        <Pressable onPress={() => router.push('auth/login')}>
                            <Text
                                style={[
                                    styles.loginText,
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
            </View>
        </ScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingHorizontal: wp(4),
    },
    welcomeImage: {
        height: hp(40),
        width: wp(100),
        alignSelf: 'center',
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold,
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontSize: hp(1.7),
        color: theme.colors.text,
        lineHeight: hp(2.7),
    },
    footer: {
        gap: 30,
        width: '100%',
    },
    loginText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6),
    },
});
