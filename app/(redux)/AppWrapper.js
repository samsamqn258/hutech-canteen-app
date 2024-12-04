import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../src/features/auth/authSlice';

const AppWrapper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="screens/auth/welcome" />
        </Stack>
    );
};

export default AppWrapper;
