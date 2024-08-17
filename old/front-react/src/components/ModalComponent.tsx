
import React from 'react'
import { useAppDispatch } from '../app/hooks';
import { modal } from "../features/modalSlice";

const ModalComponent = (props) => {
  const {title, body  } = props
  const dispatch = useAppDispatch();
  return (
    <div className="modal">
        <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" 
            onClick={()=> {dispatch(modal({name:'', isOpen: false}))}}>x</button>
            </div>
            <div className="modal-body">
             {body}
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
               onClick={()=> {dispatch(modal({name:'', isOpen:false}))}}
            >Close</button>
           
            </div>
        </div>
        </div>
  </div>

  )
}
export default ModalComponent
