import API from "../api";
import {
    CITY_HOURLY_WEATHER_LOADED,
    CITY_HOURLY_WEATHER_LOADING,
    SET_CITY_HOURLY_WEATHER
} from "../types/hourlyWeatherTypes";
import {CITY_WEATHER_FAILED} from "../types/cityWeatherTypes";

const startLoadingHourlyWeather = () => ({type: CITY_HOURLY_WEATHER_LOADING});

const finishLoadingHourlyWeather = () => ({type: CITY_HOURLY_WEATHER_LOADED});

const hourlyWeatherFailed = errorMessage => ({type: CITY_WEATHER_FAILED, payload: errorMessage});

export const getHourlyWeather = (lat, lon, cityName) => async dispatch => {
    try {
        dispatch(startLoadingHourlyWeather())
        const {data} = await API.get('/onecall', { params: { lat, lon, exclude: 'current' } });
        const {hourly} = data;
        const temperatures = hourly.map(hourWeather => hourWeather.temp);
        const maxTemp = Math.max.apply(Math, temperatures);
        const minTemp = Math.min.apply(Math, temperatures);
        dispatch({type: SET_CITY_HOURLY_WEATHER, payload: {cityName, hourly, maxTemp, minTemp} });
        dispatch(finishLoadingHourlyWeather());
    } catch (error) {
        dispatch(finishLoadingHourlyWeather())
        dispatch(hourlyWeatherFailed(error.message))
    }
}