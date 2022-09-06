import React from 'react';

const Input = ({placeholder, setInput}) => {
  return (
    <div className="d-flex flex-column align-items-center w-100 mb-3">
      <input type="text" className="w-75 text-center input" placeholder={placeholder} onChange={e => setInput(e.target.value)} />
      <div className="mt-1 ml-auto horizontal-line"/>
    </div>
  )
}

export default Input;