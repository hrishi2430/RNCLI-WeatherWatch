import React from 'react';
import { Text, Image, FlatList, StyleSheet, View } from 'react-native';
import isEqual from 'react-fast-compare';
import getWeatherImage from '../../helpers/getWeatherImage';
import DailyWeatherReportItem from './DailyWhetherReportItem';
import { WeatherData } from '../../store/slices/weatherSlice';

interface WhetherReportProps {
    currentCity: string;
    weatherData: WeatherData | null;
    averageTemp: () => number | null;
}

const WhetherReport: React.FC<WhetherReportProps> = React.memo(({ currentCity, weatherData, averageTemp }) => {
    if (!weatherData) return null;

    const weatherUnit = weatherData?.current_weather_units?.temperature;
    const temperature = weatherData?.current_weather?.temperature;
    const weatherCode = weatherData?.current_weather?.weathercode;

    return (
        <View>
            <View style={styles.setInline}>
                <View>
                    <Text style={styles.location}>{currentCity}</Text>
                    <Text style={styles.currentTempStyle}>{temperature}{weatherUnit}</Text>
                </View>
                <Image testID="header-weather-image" source={{ uri: getWeatherImage(weatherCode) }} style={styles.image} />
            </View>
            <Text style={{ paddingVertical: 10 }}>Average Temp: {averageTemp()}{weatherUnit}</Text>
            <FlatList
                data={weatherData?.daily?.time}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={() => weatherData?.daily?.time.length ? <Text style={styles.headerText}>Daily forecast</Text> : null}
                renderItem={({ item, index }) => (
                    <DailyWeatherReportItem
                        date={item}
                        maxTemp={weatherData?.daily?.temperature_2m_max?.[index]}
                        minTemp={weatherData?.daily?.temperature_2m_min?.[index]}
                        weatherCode={weatherData?.daily?.weathercode?.[index]}
                        weatherUnit={weatherUnit}
                    />
                )}
                keyExtractor={(item) => item}
            />
        </View>
    );
}, isEqual);

const styles = StyleSheet.create({
    setInline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    location: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'white'
    },
    currentTempStyle: {
        fontSize: 48,
        paddingVertical: 20,
    },
    image: {
        width: 150,
        height: 100,
    },
});

export default WhetherReport;
