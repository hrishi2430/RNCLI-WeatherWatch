import React from 'react';
import isEqual from 'react-fast-compare';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(({ value, onChangeText, onSearch }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSearch} style={styles.iconContainer} testID='search-icon'>
        <Icon name="search" size={20} color="#333" />
      </TouchableOpacity>
      <TextInput
        testID='search-input'
        style={styles.input}
        placeholder="Search for a location..."
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
      />
    </View>
  );
}, isEqual);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});

export default SearchInput;
