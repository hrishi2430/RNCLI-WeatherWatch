import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Modal, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../customHooks/storeHooks';
import { fetchGeocoding, GeocodingResult, resetState } from '../store/slices/geocodingSlice';
import useDebounce from '../customHooks/useDebounce';
import SearchInput from './SearchInput';
import isEqual from 'react-fast-compare';

export interface WeatherSearchModalProps {
    visible: boolean;
    onClose: () => void;
    onLocationSelect: (item: GeocodingResult) => void;
    onSearch: () => void;
}

const WeatherSearchModal: React.FC<WeatherSearchModalProps> = React.memo(({
    visible,
    onClose,
    onLocationSelect,
    onSearch
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useAppDispatch();

    const geocodingData = useAppSelector((state) => state.geocoding.locationData);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            dispatch(fetchGeocoding(debouncedSearchTerm));
        }
        return () => {
            dispatch(resetState?.());
        }
    }, [debouncedSearchTerm, dispatch]);


    const handleSearchChange = useCallback((text: string) => {
        setSearchTerm(text);
    }, []);

    const handleLocationPress = useCallback((item: GeocodingResult) => {
        onLocationSelect(item);
        setSearchTerm('');
        onClose();
    }, [onLocationSelect, onClose]);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <SearchInput
                        value={searchTerm}
                        onChangeText={handleSearchChange}
                        onSearch={onSearch}
                    />
                    {geocodingData?.results?.length > 0 && (
                        <FlatList
                            data={geocodingData.results}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.resultItem} onPress={() => handleLocationPress(item)}>
                                    <Text>{item.name}, {item.country}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            style={styles.searchResults}
                            contentContainerStyle={styles.searchResultsContainer}
                        />
                    )}
                    <Button testID='close-modal-button' title="Close" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}, isEqual);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        elevation: 5,
    },
    searchResults: {
        maxHeight: 300,
    },
    searchResultsContainer: {
        padding: 0,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default WeatherSearchModal;
