import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {setCities, addCity } from "../actions/cityActions";
import { CityCard } from "./CityCard";

export const CityList = () => {
    const dispatch = useDispatch();
    const cities = useSelector(state => state.cityNames);
    const error = useSelector(state => state.cityWeather.error);
    const [city, setCity] = useState('');

    useEffect(() => {
        dispatch(setCities());
    }, [dispatch])

    const handleInputChange = event => setCity(event.target.value)

    const handleAddCity = () => {
        dispatch(addCity(city));
        setCity('');
    };

    const handleEnterKeyDown = event => {
        if (event.key === 'Enter') {
           setCity(event.target.value);
           handleAddCity();
        }
    }

    return (
        <>
            <div className="input-group mt-3">
                <input type="text"
                       className="form-control"
                       placeholder="Type city name"
                       value={city}
                       onChange={handleInputChange}
                       onKeyDown={handleEnterKeyDown}
                />
                    <div className="input-group-append">
                        <button onClick={handleAddCity} className="btn btn-primary float-right">Add city</button>
                    </div>
            </div>
            { error && <div className="alert alert-danger mt-3" role="alert"> {error}</div> }
            { cities.map(city => <CityCard key={city} cityName={city} />) }
        </>
    )
}