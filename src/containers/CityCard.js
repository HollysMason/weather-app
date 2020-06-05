import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {removeCity} from "../actions/cityActions";
import {getWeatherCityInfo} from "../actions/cityWeatherActions";
import {TableDetails} from "../components/TableDetails";
import {getMainWeatherData} from "../utils/wetherDataSerializers";
import {Spinner} from "../components/Spinner";

export const CityCard = ({ cityName }) => {
    const dispatch = useDispatch();
    const cityWeatherData = useSelector(state => state.cityWeather.cityWeatherData[cityName])

    useEffect(() => {
        dispatch(getWeatherCityInfo(cityName))
    }, [dispatch, cityName])

    const handleRemoveCity = () => dispatch(removeCity(cityName));

    const handleUpdateWeather = () => dispatch(getWeatherCityInfo(cityName));

    return (
        <div className="card mt-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-6">
                        <Link to={`/${cityName}`}>
                            <h5 className="card-title">{cityName}</h5>
                        </Link>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-sm btn-danger float-right ml-1" onClick={handleRemoveCity}>
                            remove
                        </button>
                        <button className="btn btn-sm btn-success float-right" onClick={handleUpdateWeather}>Update</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-4">
                        {
                            cityWeatherData && cityWeatherData.main
                                ? (
                                    <TableDetails
                                        tableData={getMainWeatherData(cityWeatherData.main)}
                                    />
                                )
                                : <Spinner/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}