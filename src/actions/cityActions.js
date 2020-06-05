import {getCitiesFromLocalStorage} from "../utils/common";
import {ADD_CITY, REMOVE_CITY, SET_CITIES} from "../types/cityTypes";

export const setCities = () => (dispatch) => {
    const cities = getCitiesFromLocalStorage();
    dispatch({type:SET_CITIES, payload: cities});
}

export const addCity = (cityName) => ({ type: ADD_CITY, payload: cityName });

export const removeCity = (cityName) => ({ type: REMOVE_CITY, payload: cityName });

