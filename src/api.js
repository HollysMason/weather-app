import axios from "axios";
import queryString from "query-string";

const paramsDefaults = {
    appid: 'fac486f4e0ad8227aa117f7ffd198c7d',
    units: 'metric'
}

const API =  axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    paramsSerializer: (params) => queryString.stringify({...paramsDefaults, ...params})
});
export default API;