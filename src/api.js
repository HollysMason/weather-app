import axios from "axios";

const API =
    axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    params: {
        appid: 'fac486f4e0ad8227aa117f7ffd198c7d',
        units: 'metric'
    }
});
export default API;