import {CITY_WEATHER_LOADED, CITY_WEATHER_LOADING, SET_CITY_WEATHER, CITY_WEATHER_FAILED} from "../types/cityWeatherTypes";

import API from "../api";
import {removeCity} from "./cityActions";

export const startLoadingWeather = () => ({type: CITY_WEATHER_LOADING});

export const finishLoadingWeather = () => ({type: CITY_WEATHER_LOADED});

export const loadingCityWeatherFailed = (errorMessage) => ({type: CITY_WEATHER_FAILED, payload: errorMessage});

export const getWeatherCityInfo = (cityName) => async dispatch => {
    try {
        dispatch(startLoadingWeather())
        const {data} = await API.get('/weather', { params: { q: cityName }  });
        dispatch({type: SET_CITY_WEATHER, payload: {data, cityName} })
        dispatch(finishLoadingWeather())
    } catch(error) {
        dispatch(finishLoadingWeather())
        dispatch(loadingCityWeatherFailed(error.message))
        dispatch(removeCity(cityName))
    }
}

