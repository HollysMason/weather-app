import {
    SET_CITY_WEATHER,
    CITY_WEATHER_LOADING,
    CITY_WEATHER_FAILED,
    CITY_WEATHER_LOADED
} from "../types/cityWeatherTypes";

const initialState = {
    cityWeatherData: {},
    loading: false,
    error: null,
};

const cityWeatherReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_CITY_WEATHER:
            const {cityWeatherData} = state;
            cityWeatherData[payload.cityName] = payload.data
            return { ...state, cityWeatherData };
        case CITY_WEATHER_LOADING:
            return { ...state, loading: true, error: null };
        case CITY_WEATHER_LOADED:
            return { ...state, loading: false };
        case CITY_WEATHER_FAILED:
            return { ...state, error: payload };
        default:
            return state;
    }
}

export default cityWeatherReducer;