import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import getWeatherImage, { WeatherCode } from '../../helpers/getWeatherImage';

interface DailyWeatherReportItemProps {
    date: string;
    maxTemp: number;
    minTemp: number;
    weatherCode: WeatherCode;
    weatherUnit: string;
}

const DailyWeatherReportItem: React.FC<DailyWeatherReportItemProps> = React.memo(({ date, maxTemp, minTemp, weatherCode, weatherUnit }) => {
    return (
        <View style={styles.container}>
            <Text>{date}</Text>
            <Text>{maxTemp + weatherUnit} - {minTemp + weatherUnit}</Text>
            <Image testID="weather-image" source={{ uri: getWeatherImage(weatherCode) }} style={styles.image} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 40,
        height: 40,
    },
});

export default DailyWeatherReportItem;
