import React, { useState } from 'react'
import { UilLocationPinAlt, UilSearchAlt } from '@iconscout/react-unicons'
import { toast } from 'react-toastify'

const Input = ({ setQuery , units, setUnits }) => {
    const [city, setCity] = useState("")

    const handleSearch = () => {
        if (city !== '') {
            setQuery({ q: city })
        }
    }

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            toast.info('Fetching user loaction')
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success('Loaction Fetched..!!')
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setQuery({
                    lat,
                    lon
                })
            })

        } else {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }
    }

    const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name
        if(units !== selectedUnit){
            setUnits(selectedUnit)
        }

    }

    


    return (
        <div className='flex flex-row justify-center my-3'>
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4 '>
                <input
                    type="text"
                    placeholder='Search for city....'
                    className='font-light px-2 w-full h-7 rounded-md text-sm shadow-2xl focus:outline-none capitalize placeholder:lowercase'
                    onChange={(e) => setCity(e.target.value)}

                />

                <UilSearchAlt
                    className='text-white cursor-pointer transition ease-out hover:scale-125'
                    size={25}
                    onClick={handleSearch}
                />

                <UilLocationPinAlt
                    className='text-white cursor-pointer transition ease-out hover:scale-125'
                    size={25}
                    onClick={handleLocationClick}
                />
            </div>
            <div className='flex flex-row w-1/4 items-center justify-center'>
                <button
                    name='metric'
                    className='text- text-white font-light hover:scale-125 transition ease-out'
                    onClick={handleUnitsChange}
                >
                    °C
                </button>
                <p className='text-xl text-white mx-1 font-extrabold'>|</p>
                <button
                    name='imperial'
                    className='text-xl text-white font-light hover:scale-125 transition ease-out'
                    onClick={handleUnitsChange}
                >
                    °F
                </button>
            </div>


        </div>
    )
}


export default Input