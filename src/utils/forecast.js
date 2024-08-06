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
            callback(undefined, 'It is curently '+ data.current.condition.text +'\nTemperature is '+ data.current.temp_c +' degrees but fees like '+ data.current.feelslike_c + ' degrees');
        }
    });
}

export {forecast}