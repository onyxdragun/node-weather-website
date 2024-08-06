console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const searchTerm = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

const getWeather = (location) => {
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    const location = searchTerm.value;
    getWeather(location);
});