import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useParams, Link } from "react-router-dom";

import {getWeatherCityInfo} from "../actions/cityWeatherActions";
import { setCities } from "../actions/cityActions";
import {Spinner} from "../components/Spinner";
import {TableDetails} from "../components/TableDetails";
import {WeatherChart} from "./WeatherChart";

import {
    getWeatherData,
    getMainWeatherData,
    getWindWeatherData,
    getSysWeatherData,
} from "../utils/wetherDataSerializers";

export const DetailWeatherInfo = () => {
    const {cityName} = useParams();
    const dispatch = useDispatch();
    const cityNames = useSelector(state => state.cityNames)
    const cityWeatherData = useSelector(state => state.cityWeather.cityWeatherData[cityName] || {})
    const [validCity, setValidCity] = useState(true);

    useEffect(() => {
        dispatch(getWeatherCityInfo(cityName));
    }, [dispatch, validCity, cityName])

    useEffect(() => {
        if (!cityNames.length) {
            dispatch(setCities())
            return;
        }
        setValidCity(cityNames.includes(cityName));
    },[dispatch, cityNames, cityName])

    const {
        main,
        sys ,
        timezone,
        visibility,
        weather,
        wind,
        clouds,
        coord,
    } = cityWeatherData;

    if (!validCity) {
        return (
            <div className="alert alert-warning mt-5" role="alert">
                Sorry, the city - <span className="text-danger">{cityName}</span> does not exist in our list.
                <br/><br/>
                Please add this city <Link to="/">here</Link> and back to check
                detail weather information.
                <br/><br/>
                Thanks!
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="text-center mt-5">Weather in <span className="text-success">{cityName}</span></h1>
            {
                !Object.keys(cityWeatherData).length
                    ? (
                        <div className="container text-center">
                            <Spinner/>
                        </div>
                    )
                    : (
                        <>
                            <WeatherChart lat={coord.lat} lon={coord.lon} cityName={cityName}/>
                            <TableDetails
                                tableData={
                                    [
                                        [
                                            {key: 'TimeZone', value: timezone / 60 / 60 },
                                            {key: 'Visibility', value: visibility || 1000, label: 'meter'},
                                            {key: 'Cloudiness', value: clouds.all, label: '%'},
                                        ]
                                    ]
                                }
                            />
                            <TableDetails
                                header={"Weather"}
                                tableData={getWeatherData(weather)}
                            />
                            <TableDetails
                                header={"Main"}
                                tableData={getMainWeatherData(main)}
                            />
                            <TableDetails
                                header={"Wind"}
                                tableData={getWindWeatherData(wind)}
                            />
                            <TableDetails
                                header={"Sys"}
                                tableData={getSysWeatherData(sys)}
                            />
                        </>
                    )
            }
        </div>
    )
}