import React from "react";
import {formattUnixTime} from "./common";

export const getWeatherData = (weather) => {
    return weather.map(weatherItem => [
        {key: 'Description', value: weatherItem.description },
        {key: 'Icon', value: weatherItem.icon },
        {key: 'Main', value: weatherItem.main },
    ])
}

export const getMainWeatherData = (main) => {
    return [
        [
            { key: 'Feels like', value: main.feels_like, label: <span>&#8451;</span> },
            { key: 'Humidity', value: main.humidity, label: '%'},
        ],
        [
            { key: 'Pressure', value: main.pressure, label: 'hpa' },
            { key: 'Temp', value: main.temp, label: <span>&#8451;</span> },
        ],
        [
            { key: 'Temp max', value: main.temp_max, label: <span>&#8451;</span> },
            { key: 'Temp min', value: main.temp_min, label: <span>&#8451;</span> },
        ]
    ]
}

export const getWindWeatherData = (wind) => {
    return [
        [
            { key: 'Deg', value: wind.deg },
            { key: 'Speed', value: wind.speed, label: 'miles/hour' },
        ]
    ]
}

export const getSysWeatherData = (sys) => {
    return [
        [
            { key: 'Country', value: sys.country },
            { key: 'Sunrise', value: formattUnixTime(sys.sunrise) },
            { key: 'Sunset', value: formattUnixTime(sys.sunset) },
        ]
    ]
}