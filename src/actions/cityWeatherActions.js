import {CITY_WEATHER_LOADED, CITY_WEATHER_LOADING, SET_CITY_WEATHER, CITY_WEATHER_FAILED} from "../types/cityWeatherTypes";

import API from "../api";
import {defaultGetRequestParams} from "../config";
import {removeCity} from "./cityActions";

export const startLoadingWeather = () => ({type: CITY_WEATHER_LOADING});

export const finishLoadingWeather = () => ({type: CITY_WEATHER_LOADED});

export const loadingCityWeatherFailed = (errorMessage) => ({type: CITY_WEATHER_FAILED, payload: errorMessage});

export const getWeatherCityInfo = (cityName) => async dispatch => {
    try {
        dispatch(startLoadingWeather())
        const {data} = await API.get('/weather', {
            /*
                For some reason my default params in axios config (../api.js) doesn't merge with additional params.
                I decided fix it like this because deadline is coming.
                I promise i will fix it ;)
             */
            params: {...defaultGetRequestParams, q: cityName }
        });
        dispatch({type: SET_CITY_WEATHER, payload: {data, cityName} })
        dispatch(finishLoadingWeather())
    } catch(error) {
        dispatch(finishLoadingWeather())
        dispatch(loadingCityWeatherFailed(error.message))
        dispatch(removeCity(cityName))
    }
}

