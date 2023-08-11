import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButton from './components/TopButton';
import Input from './components/Input';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAnsdetails from './components/TemperatureAndDetails'
import Forecast from './components/Forecast';
import getWeatherData from './services/weatherService';
import getFormattedweatherData from './services/weatherService';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({ q: 'berlin' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)


  useEffect(() => {

    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location'

      toast.info('Fetching weather for ' + message)

      await getFormattedweatherData({ ...query, units }).then((data) => {
        toast.success(`successfully fetched weather for ${data.name}, ${data.country}.`)
        setWeather(data)
      })
    }
    fetchWeather()

  }, [query, units])

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'

    const threshold = (units === 'metric') ? 25 : 60

    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  }


  return (
    <div className={` mx-auto  sm:w-min my-[5%] py-3 px-14 bg-gradient-to-br shadow-gray-950 shadow-t shadow-2xl rounded-md ${formatBackground()} text-center w-[93%] `} >
      <TopButton setQuery={setQuery} />
      <Input setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather &&
        (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAnsdetails weather={weather} />
            <Forecast title='hourly Forecast' weather={weather.hourly} />
            <Forecast title='days Forecast' weather={weather.daily} />

          </div>
        )
      }
      {/* <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} /> */}
    </div>
  );
}

export default App;
