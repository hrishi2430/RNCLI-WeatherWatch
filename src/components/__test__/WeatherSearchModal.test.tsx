import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WeatherSearchModal, { WeatherSearchModalProps } from '../WeatherSearchModal';
import { useAppDispatch, useAppSelector } from '../../customHooks/storeHooks';
import { resetState } from '../../store/slices/geocodingSlice';

jest.mock('../../customHooks/storeHooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../../store/slices/geocodingSlice', () => ({
  fetchGeocoding: jest.fn(),
  resetState: jest.fn(),
}));

describe('WeatherSearchModal', () => {
  const mockOnClose = jest.fn();
  const mockOnLocationSelect = jest.fn();
  const mockOnSearch = jest.fn();
  const mockDispatch = jest.fn();

  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  (useAppSelector as jest.Mock).mockReturnValue({
    locationData: {
      results: [{ id: 1, name: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060 }],
    },
    status: 'idle',
    error: null,
  });

  const renderComponent = (props: Partial<WeatherSearchModalProps> = {}) =>
    render(
        <WeatherSearchModal
          visible={true}
          onClose={mockOnClose}
          onLocationSelect={mockOnLocationSelect}
          onSearch={mockOnSearch}
          {...props}
        />
    );

  it('calls onSearch when the search input submit editing event is triggered', () => {
    const { getByPlaceholderText } = renderComponent();

    const input = getByPlaceholderText('Search for a location...');
    fireEvent(input, 'submitEditing');

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('calls onClose when the close button is pressed', () => {
    const { getByText } = renderComponent();

    const closeButton = getByText('Close');
    fireEvent.press(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('dispatches resetState action when component unmounts', () => {
    const { unmount } = renderComponent();
    unmount();

    expect(resetState)?.toHaveBeenCalled();
  });

  it('calls onLocationSelect when a location is pressed', () => {
    const mockGeocodingData = {
      results: [
        { id: 1, name: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060 },
      ],
    };
    
    (useAppSelector as jest.Mock).mockReturnValueOnce(mockGeocodingData);

    const { getByText } = renderComponent();

    const locationItem = getByText('New York, USA');
    fireEvent.press(locationItem);

    expect(mockOnLocationSelect).toHaveBeenCalledWith(mockGeocodingData.results[0]);
  });
});
