import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const Loader = (props) => {
    
  return (
    <div>
        <div className="mt-11 pt-13 mx-auto">
          {props.isLoading === true && (
            <div className="text-center flex justify-center">
              <AiOutlineLoading3Quarters className="animate-spin text-black mt-10" size={35}/>
            </div>
          )}
        </div>
    </div>
  )
}

export default Loader