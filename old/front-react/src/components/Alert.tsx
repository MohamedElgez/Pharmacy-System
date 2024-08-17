import React from 'react'

const Alert = (props) => {
    const {color, massage} = props
  return (
    <div>

  
    <div className= { `alert alert-${color} alert-dismissible fade show` } role="alert">
        { massage}
    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  </div>

  )
}
export default Alert;
