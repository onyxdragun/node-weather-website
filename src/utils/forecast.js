import request from "request";

const forecast = ({latitude, longitude}, callback) => {
    const coords = latitude + ',' + longitude;
    const url = 'http://api.weatherapi.com/v1/forecast.json?q=' + coords +'&key=8553dc5a0ded4d13bf0213940240408';

    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to Weather Service', undefined);
        } else if (body.error) {
            callback('Error '+ body.error.code +'\nMessage: '+ body.error.message);
        } else {
            const data = body;
            const currentText = data.current.condition.text;
            const currentTemp = data.current.temp_c;
            const currentFeelsLike = data.current.feelslike_c;
            const forecastPrecipAmt = data.forecast.forecastday[0].day.daily_chance_of_rain;
            callback(undefined, 'It is curently '+ currentText +'\nTemperature is '+ currentTemp +' degrees but feels like '+ currentFeelsLike + ' degrees. There is a '+ forecastPrecipAmt +'% chance of rain.');
        }
    });
}

export {forecast}