import React from 'react';
import Input from './Input';
import Feather from '@expo/vector-icons/Feather';
const SearchInput = ({ onPress, query, onChange }) => {
  return (
    <Input
      type="search"
      icon={<Feather name="search" size={20} color="black" />}
      placeholder="Tìm kiếm"
      onPress={onPress}
      value={query}
      onChange={onChange}
    />
  );
};

export default SearchInput;
