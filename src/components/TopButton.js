import React from 'react'

const TopButton = ({setQuery}) => {

    const cities = [
        {
            id:1,
            title:'Delhi'
        },
        {
            id:2,
            title:'Singapore'
        },
        {
            id:3,
            title:'Pune'
        },
        {
            id:4,
            title:'Indore'
        },
        {
            id:5,
            title:'London'
        },
    ]

  return ( 
    <div className='flex items-center justify-around ' >
        {cities.map((city) => 
            <button key={city.id} className='text-white text-xs font-medium ' onClick={() => setQuery({q: city.title})}>{city.title} </button>
        )}
    </div>
  )
}

export default TopButton