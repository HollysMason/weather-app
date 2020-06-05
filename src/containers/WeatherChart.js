import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getHourlyWeather} from "../actions/houtlyWeatherActions";
import {range, formattUnixTime} from "../utils/common";
import {Spinner} from "../components/Spinner";

export const WeatherChart = ({lat, lon, cityName}) => {
    const pointHeight = 17;
    const dispatch = useDispatch();
    const hourlyData = useSelector(state => state.hourlyWeather.hourlyWeatherData[cityName])
    const [yPoints, setYPoints] = useState([]);
    const [hourlyWeather, setHourlyWeather] = useState([]);

    useEffect(() => {
        dispatch(getHourlyWeather(lat, lon, cityName));
    }, [dispatch, lat, lon, cityName])

    useEffect(() => {
        if (hourlyData) {
            const {minTemp, maxTemp} = hourlyData;
            const yPointValues = range(Math.floor(minTemp) - 3, Math.round(maxTemp) + 3).reverse();
            setYPoints(yPointValues)
            setHourlyWeather(hourlyData.hourly);
        }
    }, [dispatch, hourlyData])

    const calculateYPosition = (temperature) => {
        const reveredYPoints = [...yPoints];
        const indexTemperature = reveredYPoints.reverse().indexOf(Math.trunc(temperature));
        return (temperature % 1) + (indexTemperature * pointHeight);
    }

    return (
        <>
            {
                hourlyData
                    ? (
                        <div className="WeatherChart d-flex">
                            <div className="WeatherChart__y-values">
                                {
                                    yPoints.map(val => (
                                        <div
                                            key={val}
                                            className="WeatherChart__y-point text-center"
                                            style={{height: `${pointHeight}px`}}
                                        >
                                            {val}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="overflow-auto position-relative w-100">
                                <div className="WeatherChart__hour-temp-container fixed-bottom position-absolute">
                                    {
                                        hourlyWeather.map(hourWeather => (
                                            <div
                                                key={`${hourWeather.temp}-${hourWeather.dt}`}
                                                className="WeatherChart__hour-temp position-relative border
                                                            border-warning rounded-pill text-center float-left"
                                                style={{bottom: `${calculateYPosition(hourWeather.temp)}px`}}
                                            >
                                                {hourWeather.temp} <span>&#8451;</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="WeatherChart__x-values 1 fixed-bottom position-absolute">
                                    {
                                        hourlyWeather.map(hourWeather => (
                                            <div
                                                key={`${hourWeather.temp}-${hourWeather.dt}`}
                                                className="WeatherChart__x-point text-center float-left"
                                            >
                                                {formattUnixTime(hourWeather.dt)}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div className="text-center mt-5 mb-5">
                            <Spinner/>
                        </div>
                    )
            }
        </>
    )
}