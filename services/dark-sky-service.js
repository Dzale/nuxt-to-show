/*import DarkSkyApi from 'dark-sky-api';

DarkSkyApi.apiKey = process.env.WEATHER_API_KEY;
/!*DarkSkyApi.proxy = true;*!/
DarkSkyApi.units = 'auto';
DarkSkyApi.language = process.env.LANG;*/

import Vue from 'vue'
var baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2ed8144738966b4582286a4b0abbeb0b/';
var params = '?exclude=alerts,flags,hourly,minutely&lang=fr&units=auto';



export async function loadWeather(axios, latitude, longitude) {
    let data = {};


    try {
        var config = {
            proxy: {
                host: 'https://forflyaway.com',
                port: 3000
            }
        };
        let response = await axios.get(baseUrl + [latitude, longitude].join() + params)
        data.currently = response.currently;
        data.daily = response && response.daily ? response.daily.data : [];
        return data;
    }catch (e) {
        return null;
    }


}
