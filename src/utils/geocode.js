import request from 'request'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1Ijoib255eGRyYWd1biIsImEiOiJjbHpnNGprZDkwbXlxMmtvanliZnhzYzlpIn0.KbOi1ISL35eejkXZuuvH0w&limit=1';

    request({ url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect location services', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try again', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address
            })
        }
    });
}

export {geocode}