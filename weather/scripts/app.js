const cityForm = document.querySelector('form');
const card =document.querySelector('.card');//image
const details = document.querySelector('.details');//city name and ocnddition
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');



const updateUI = (data) =>{
    console.log(data);
    const cityDets = data.cityDets;
    const weather = data.weather;

    //update details
    details.innerHTML = `
            <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
    `
    //update night and day / icon

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);

    // if (data.IsDayTime) {
    //     document.time.src = "img/day.svg";
    // }

    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc= 'img/day.svg';
    } else {
        timeSrc= 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    //remove the dnone class bosstrap

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) =>{

    // console.log(city);
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };
    
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    // console.log(city);
    cityForm.reset();

    //update the ui with new city
    updateCity(city).then(data =>  updateUI(data)).catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);
});


if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city')).then(data =>  updateUI(data)).catch(err => console.log(err));
    
}