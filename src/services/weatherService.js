import { DateTime } from 'luxon'

const API_KEY = '4010ab89cb04fa489e2c17d0c7272953'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// https://api.openweathermap.org/data/2.5
// /weather?q=tokyo&appid=fba376777c7ba0735379b63f439e4837


const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType)
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })

    console.log("url=======>", url);

    return fetch(url).then((res) => {
        return res.json()
    })
    // .then((data) => data)
}




const formatCurrentWeather = (data) => {

    // console.log('weather============>', data);

    const {
        coord: { lon, lat },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon } = weather[0]


    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed }

}

const formatForecastWeather = (data, dt) => {


    // let { timezone, daily, hourly } = data

    let { list, city } = data

    let { timezone } = city

    const hourly = list?.map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.main.temp / 10,
            icon: d.weather[0].icon
        }
    })?.slice(0, 5)

    // let daily = list.map( d =>{
    //     return {
    //         title : formatToLocalTime(d.dt, timezone, 'ccc'),
    //         temp:d.main.temp/10,
    //         icon:d.weather[0].icon

    //     }
    // }).slice(0,5)

    // console.log(daily);

    const uniqueTitles = new Set();
    const daily = list?.map((d) => {
            const title = formatToLocalTime(d.dt, timezone, 'ccc');

            if (uniqueTitles.has(title)) {
                return null; // Skip this data point if the title has been encountered before
            } else {
                uniqueTitles.add(title); // Add the title to the set
                return {
                    title,
                    temp: d.main.temp / 10,
                    icon: d.weather[0].icon,
                };
            }
        })
        ?.filter((item) => item !== null)
        ?.slice(0, 5);





    // hourly = hourly?.slice(1, 6).map(d => {
    //     return {
    //         title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
    //         temp: d.temp,
    //         icon: d.weather[0].icon
    //     }
    // })

    // daily = daily?.slice(1, 6).map(d => {
    //     return {
    //         title: formatToLocalTime(d.dt, timezone, 'ccc'),
    //         temp: d.temp.day,
    //         icon: d.weather[0].icon
    //     }
    // })

    return {
        timezone, hourly, daily
    }

}

const getFormattedweatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
        .then(formatCurrentWeather)
    // console.log(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('forecast', {
        lat,
        lon,
        // exclude: "current,minutely,alerts",
        // units: searchParams.units
    }).then((data) => formatForecastWeather(data, formattedCurrentWeather.dt))

    return { ...formattedCurrentWeather, ...formattedForecastWeather }
}

const formatToLocalTime = (secs, zone, format = "cccc dd LLL yyyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) => {
    // console.log(`http://openweathermap.org/img/wn0/${code}@2x.png`);
    return `https://openweathermap.org/img/wn/${code}@2x.png`
}

export default getFormattedweatherData

export { formatToLocalTime, iconUrlFromCode }


//http://openweathermap.org/img/wn01



