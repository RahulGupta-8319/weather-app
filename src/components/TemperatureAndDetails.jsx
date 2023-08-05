import React from 'react'
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset
} from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService'

const TemperatureAndDetails = ({ weather: {
    details, icon,temp, temp_max, temp_min, sunrise, sunset, speed, humidity, feels_like, timezone
} }) => {
    return (
        <div>

            <div className='flex justify-center items-center  text-cyan-500 text-xs p-1'>
                {details}
            </div>

            <div className='flex  items-center justify-between text-white py-1'>
                <img src={iconUrlFromCode(icon) }
                    alt=""
                    className='w-16 '
                />

                <p className='text-xl'>{temp.toFixed() + '°' }</p>
                <div className='flex flex-col justify-start items-start space-y-2'>


                    <div className='flex font-extralight text-[10px] items-center justify-center'>
                        <UilTemperature size="12" />
                        Real Felt:
                        <span className='font-normal ml-1'>{feels_like.toFixed() + '°'}</span>
                    </div>
                    <div className='flex font-extralight text-[10px] items-center justify-center'>
                        <UilTear size="12" />
                        Humidity :
                        <span className='font-normal ml-1'>{humidity + '%'}</span>
                    </div>
                    <div className='flex font-extralight text-[10px] items-center  justify-around '>
                        <UilWind size="12" />
                        Wind Speed:
                        <span className='font-normal ml-1'>{speed.toFixed()+ 'km/h'}</span>
                    </div>


                </div>
            </div>

            <div className='flex justify-center items-center text-white space-x-2 text-[10px] py-3 w-96 '>
                <UilSun size="15px" />
                <p className='font-light'>Rise: <span className='font-medium '>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
                <p className='font-light'>|</p>

                <UilSunset size="15px" />
                <p>Set: <span className='font-medium'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
                <p className='font-light'>|</p>

                <UilArrowUp size="15px" />
                <p>Max: <span className='font-medium'>{temp_max.toFixed() + '°'}</span></p>
                <p className='font-light'>|</p>

                <UilArrowDown size="15px" />
                <p>Low: <span className='font-medium'>{temp_min.toFixed() + '°'}</span></p>
            </div>


        </div>
    )
}

export default TemperatureAndDetails