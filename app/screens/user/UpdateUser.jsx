import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import useUser from '@/src/features/auth/useUser';
import useToken from '@/src/hooks/useToken';
import useUpdateUser from '@/src/features/auth/useUpdateUser';
import ScreenWrapper from '@/src/components/ScreenWrapper';
import BackButton from '@/src/components/BackButton';
import { ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Input from '@/src/components/Input';
const UpdateUser = () => {
    const router = useRouter();
    const token = useToken();
    const { user } = useUser();
    const { updateUser, isUpdating } = useUpdateUser();

    const [name, setName] = useState(user?.user.name || '');
    const [email, setEmail] = useState(user?.user.email || '');
    const [avatar, setAvatar] = useState(user?.user.avatar || null);

    const handleAvatarChange = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images', 'videos'],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
                setAvatar(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Lỗi khi chọn ảnh:', error);
            Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
        }
    };

    const handleUpdate = () => {
        updateUser({
            name,
            avatar,
            token,
        });
    };

    return (
        <ScrollView className="bg-darkLight" showsVerticalScrollIndicator={false}>
            <ScreenWrapper>
                <View className="flex flex-row items-center px-5 border-b-2 pb-3 mx-[-20px] border-gray">
                    <BackButton router={router} />
                    <Text className="my-0 mx-auto text-xl font-semibold">Cập nhật thông tin</Text>
                </View>

                <View className="mt-10 flex items-center justify-center">
                    <Pressable className="relative" onPress={handleAvatarChange}>
                        <Image
                            source={{ uri: avatar }}
                            className="w-36 h-36 rounded-full object-contain"
                        />
                        <View className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center absolute bottom-0 right-0">
                            <AntDesign name="camera" size={16} color="gray" />
                        </View>
                    </Pressable>

                    <View className="mt-10 w-full flex flex-col gap-4">
                        <Input type="inputMedium" value={name} onChangeText={setName} />
                        <Input type="inputMedium" value={email} onChangeText={setEmail} />
                    </View>
                </View>
                <Pressable
                    className="mt-10 w-full bg-primary p-6 rounded-lg"
                    onPress={handleUpdate}
                    disabled={isUpdating}>
                    <Text className="text-white font-semibold text-center text-xl">
                        Cập nhật tài khoản
                    </Text>
                </Pressable>
            </ScreenWrapper>
        </ScrollView>
    );
};

export default UpdateUser;
