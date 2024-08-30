import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SearchInput from '../SearchInput';

describe('SearchInput', () => {

  it('calls onChangeText when text input changes', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={onChangeTextMock} onSearch={() => { }} />
    );

    const input = getByPlaceholderText('Search for a location...');
    fireEvent.changeText(input, 'New text');

    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
  });
  it('calls onSearch when the submit editing event is triggered', () => {
    const onSearchMock = jest.fn();
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput value="test" onChangeText={onChangeTextMock} onSearch={onSearchMock} />
    );

    const input = getByPlaceholderText('Search for a location...');

    fireEvent(input, 'submitEditing', { nativeEvent: { text: 'New Location' } });
    expect(onSearchMock).toHaveBeenCalled();
  });
  it('calls onSearch when the search icon is pressed', () => {
    const onSearchMock = jest.fn();
    const onChangeTextMock = jest.fn();

    const { getByTestId } = render(
      <SearchInput value="test" onChangeText={onChangeTextMock} onSearch={onSearchMock} />
    );

    const searchIcon = getByTestId('search-icon');
    fireEvent.press(searchIcon);
    expect(onSearchMock).toHaveBeenCalled();
  });
});
