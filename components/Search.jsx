import { View, Text } from 'react-native';
import React from 'react';
import Input from './Input';
import Feather from '@expo/vector-icons/Feather';
const Search = () => {
    return (
        <Input
            type="search"
            icon={<Feather name="search" size={20} color="black" />}
            placeholder="Tìm kiếm"
        />
    );
};

export default Search;
