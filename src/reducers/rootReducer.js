import {combineReducers} from "redux";

import cityReducer from "./cityReducer"
import cityWeatherReducer from "./cityWeatherReducer";
import hourlyWeatherReducer from "./hourlyWeatherReducer";

const rootReducer = combineReducers({
    cityNames: cityReducer,
    cityWeather: cityWeatherReducer,
    hourlyWeather: hourlyWeatherReducer,
})

export default rootReducer;