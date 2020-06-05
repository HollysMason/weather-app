import {ADD_CITY, REMOVE_CITY} from "../types/cityTypes";
import {getCitiesFromLocalStorage} from "../utils/common";

export function cityNamesLocalStorageMiddleWare() {
    return next => {
        return action => {
            let localeStorageCities = getCitiesFromLocalStorage();

            switch (action.type) {
                case ADD_CITY:
                    if (!localeStorageCities.includes(action.payload)) {
                        localeStorageCities.push(action.payload);
                        localStorage.setItem('cities', localeStorageCities);
                    }
                    return next(action);
                case REMOVE_CITY:
                    localeStorageCities = localeStorageCities.filter(cityName => cityName !== action.payload)
                    localStorage.setItem('cities', localeStorageCities);
                    return next(action);
                default:
                    return next(action)
            }
        }
    }
}