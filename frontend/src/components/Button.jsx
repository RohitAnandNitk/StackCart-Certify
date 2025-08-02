import React from 'react'

function Button(props) {
  return (
    <div>
             <button onClick={props.onClick}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-700 text-slate-900 font-semibold text-xl px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-green-800 mx-auto"
            >
              {props.name}
             </button>
    </div>
  )
}

export default Button
