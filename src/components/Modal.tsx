import React, { useState } from "react"
import ReactDOM from "react-dom"
import {useDispatch} from 'react-redux'
import '../css/modal.css'
import { addItemAction } from "../redux/reducers/listReducer"
interface ModalProps {
  showModal: boolean
  closeModal: ()=> void
}

const modal: HTMLElement = document.getElementById("modal") as HTMLDivElement

const Modal: React.FC<ModalProps> = ({ showModal,closeModal }) => {
  const dispatch = useDispatch()
  const [title,setTitle] = useState("")
  
  if (!showModal) return null

  const addToStore = () =>{
    

    if(title.trim().length){
      dispatch(addItemAction({id:new Date().getTime(),title}))
      setTitle("")
    }
  }

  const handleChange = (e:any) =>{
    e.preventDefault()
    let value = (e.target as HTMLInputElement).value
    setTitle(value)
  }

  return ReactDOM.createPortal(
    <>
      <div className="wrapper">
        <div className="content-wrap">
          <div>
            <h3>Введите сообщение</h3>
          </div>
          <div>
            <input value={title} onChange={handleChange} className="modal-input" type="text" />
          </div>
          <div className="modal-control">
            <button onClick={addToStore} className="okBtn">Ок</button>
            <button onClick={closeModal} className="cancelBtn">Отмена</button>
          </div>
        </div>
      </div>
    </>,

    modal
  )
}

export default React.memo(Modal)
