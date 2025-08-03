import React from 'react'

function Button(props) {
  return (
    <div>

      <button onClick={props.onClick}
        type="submit"
        className='bg-green-700 hover:bg-green-800 text-white text-lg font-semibold py-2 px-4 rounded-lg mt-4 transition duration-200'
      >
        {props.name}
      </button>
    </div>

     
  )
}

export default Button
