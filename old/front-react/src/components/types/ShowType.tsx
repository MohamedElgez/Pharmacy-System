import React from 'react'

const ShowTypeComponent = (props) => {
    const {item } = props;

  return (
        <div className="card text-white bg-primary mb-3">
            <div className="card-header">{item.name}</div>
            <div className="card-body">
            
            </div>
       </div>
  )
}

export default ShowTypeComponent;