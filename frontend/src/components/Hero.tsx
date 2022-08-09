import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div>
      <div className="h-[700px] w-full overflow-auto flex hero-container">
        <div className="find-btn  bg-black text-white rounded-lg w-72 h-16 mx-auto self-center text-center box-border p-5 text-[1.5rem] leading-7 tracking-wider cursor-pointer"><Link to={"/all-events"}>Find your next event</Link></div>
      </div>
    </div>  
  )
}

export default Hero