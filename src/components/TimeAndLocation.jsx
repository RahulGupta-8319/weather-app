import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

const TimeAndLocation = ({weather : {dt, timezone, name ,country}}) => {
  return (
    <div>
        <div className='flex justify-center items-center '>
            <p className='text-white text-[16px] font-extralight '>
                {formatToLocalTime(dt, timezone)}
            </p>
        </div>
        <div className='flex justify-center items-center my-2'>
            <p className='text-stone-100 text-xl font-medium uppercase shadow-md px-6 shadow-slate-600'>
                {`${name}, ${country}`}
            </p>
        </div>
    </div>
  )
}

export default TimeAndLocation