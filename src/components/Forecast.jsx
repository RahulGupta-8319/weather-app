import React from 'react'
import { iconUrlFromCode } from '../services/weatherService';

const Forecast = ({ title, weather : data }) => {

    return (
        <div>
            <div className='flex justify-start '>
                <p className='text-white font-medium uppercase text-sm'>{title}</p>
            </div>
            <hr className='my-1' />


            <div className='flex flex-row items-center justify-between text-white my-2 px-3'>
                {
                    data.map((d, i) => {
                        return (
                            <div className='flex flex-col items-center justify-center ' key={i}>
                                <p className='font-light text-[10px] '>
                                    {d.title}
                                </p>
                                <img src={iconUrlFromCode(d.icon)} alt="" className='w-10 ' />
                                <p className='font-semibold text-xs'>{d.temp.toFixed() + '°'}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Forecast