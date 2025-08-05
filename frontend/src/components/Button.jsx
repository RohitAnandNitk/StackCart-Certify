import React from 'react'
import { useCertificateStore } from '../store/useCertificateIdStore'

function Button(props) {
   const {loading} = useCertificateStore() ; 
  return (
    <div>

      <button disabled = {loading} onClick={props.onClick}
        type="submit"
        className='bg-green-700 hover:bg-green-800 text-white text-lg font-semibold py-2 px-4 rounded-lg mt-4 transition duration-200'
      >
        {props.name}
      </button>
    </div>

     
  )
}

export default Button
