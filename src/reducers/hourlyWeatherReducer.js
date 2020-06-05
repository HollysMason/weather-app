import {
    SET_CITY_HOURLY_WEATHER,
    CITY_HOURLY_WEATHER_LOADING,
    CITY_HOURLY_WEATHER_LOADED,
    CITY_HOURLY_WEATHER_FAILED,
} from "../types/hourlyWeatherTypes";

const initialState = {
    hourlyWeatherData: {},
    loading: false,
    error: null,
};

const hourlyWeatherReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_CITY_HOURLY_WEATHER:
            const {hourlyWeatherData} = state;
            hourlyWeatherData[payload.cityName] = payload
            return { ...state, hourlyWeatherData };
        case CITY_HOURLY_WEATHER_LOADING:
            return { ...state, loading: true, error: null };
        case CITY_HOURLY_WEATHER_LOADED:
            return { ...state, loading: false };
        case CITY_HOURLY_WEATHER_FAILED:
            return { ...state, error: payload };
        default:
            return state;
    }
}

export default hourlyWeatherReducer;