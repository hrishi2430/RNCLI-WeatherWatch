import React, { useState, useCallback, useEffect } from 'react';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../customHooks/storeHooks';
import { fetchWeather } from '../../store/slices/weatherSlice';
import { fetchGeocoding, GeocodingResult } from '../../store/slices/geocodingSlice';
import WeatherSearchModal from '../../components/WeatherSearchModal';
import Icon from 'react-native-vector-icons/Ionicons';
import WhetherReport from './WhetherReport';

const WeatherScreen = () => {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.weather.weatherData);
  const weatherStatus = useAppSelector((state) => state.weather.status);
  const [currentCity, setCurrentCity] = useState('Pune');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchWeatherForDefaultCity = useCallback(async () => {

    const action = await dispatch(fetchGeocoding(currentCity));
    if (fetchGeocoding?.fulfilled?.match?.(action)) {
      const results: GeocodingResult[] = action?.payload?.results;
      if (results.length > 0) {
        const { latitude, longitude } = results?.[0];
        console.log('calling fetchWeather api')
        dispatch(fetchWeather({ lat: latitude, lon: longitude }));
      }
    }

  }, [dispatch]);

  useEffect(() => {
    fetchWeatherForDefaultCity();
  }, [fetchWeatherForDefaultCity]);

  const handleLocationSelect = useCallback((location: GeocodingResult) => {
    setCurrentCity(location.name);
    dispatch(fetchWeather({ lat: location.latitude, lon: location.longitude }));
    setIsModalVisible(false);
  }, [dispatch]);

  const averageTemp = () => {
    const daily = weatherData?.daily;
    if (!daily) return null;

    const { temperature_2m_max: maxTemps, temperature_2m_min: minTemps } = daily;

    const totalAverageTemp = maxTemps.reduce((acc, max, idx) => {
      const avgTemp = (max + minTemps[idx]) / 2;
      return acc + avgTemp;
    }, 0);

    return maxTemps.length > 0 ? Math.round(totalAverageTemp / maxTemps.length) : 0;
  };
  if (weatherStatus === 'loading') {
    return <View style={styles.fallbackContainer}><Text style={styles.fallbackText}>Loading...</Text></View>;
  }

  if (weatherStatus === 'failed') {
    return <View style={styles.fallbackContainer}><Text style={styles.fallbackText}>Error loading data</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity testID='header-search-icon' style={styles.iconContainer} onPress={() => setIsModalVisible(true)}>
        <Icon name="search" size={20} color="#333" onPress={() => setIsModalVisible(true)} />
      </TouchableOpacity>
      <WeatherSearchModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onLocationSelect={handleLocationSelect}
        onSearch={() => { }}
      />
      <WhetherReport
        currentCity={currentCity}
        weatherData={weatherData}
        averageTemp={averageTemp}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    margin: 16,
    marginTop: 32
  },
  fallbackText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  currentTempStyle: {
    fontSize: 48,
    paddingVertical: 20,
  },
  iconContainer: { alignSelf: 'flex-end', }
});

export default WeatherScreen;
