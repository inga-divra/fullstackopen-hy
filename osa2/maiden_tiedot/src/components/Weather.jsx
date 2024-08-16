import axios from "axios"
import { useEffect, useState } from "react"

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null)

    const fetchWeather = () => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
            .then(response => {
                const weatherData = response.data
                setWeather(weatherData)
                console.log(weatherData)
            })
            .catch((error) => {
                console.log('There was an error with fetching data', error);
            })
    }

    useEffect(() => {
        fetchWeather()
    }, [capital])

    if (!weather) {
        return <h3>Loading weather...</h3>
    }

    return (
        <div className='weather'>
            <h3 className='weather_title'>Weather in {capital}</h3>
            <p className='weather_info'>Temperature: {weather.main.temp} C</p>
            <p className='weather_info'>Wind: {weather.wind.speed} m/s</p>
            <div className='weather_img_container'>
                <img
                    className='weather_img'
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description} />
            </div>
        </div>
    )
}

export default Weather