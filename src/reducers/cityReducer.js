import {ADD_CITY, REMOVE_CITY, SET_CITIES} from "../types/cityTypes";

const initialState = [];

const cityReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_CITIES:
            return [...payload];
        case ADD_CITY:
            return [...state, payload];
        case REMOVE_CITY:
            return state.filter(city => city !== payload);
        default:
            return state;
    }
}

export default cityReducer;