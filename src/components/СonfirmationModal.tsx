import React, { Dispatch, SetStateAction } from 'react'
import ReactDom from 'react-dom'
import "../css/confirmModal.css"
import { useAppDispatch } from '../redux/redux'
import { deleteAction } from '../redux/rootReducer'

interface СonfirmationModalProps{
    showConfirmModal: boolean
    setShowConfirmModal:Dispatch<SetStateAction<boolean>>
    selectedItem:number
    setSelectedItem:Dispatch<SetStateAction<number>>
}

const СonfirmationModal:React.FC<СonfirmationModalProps> = ({showConfirmModal,setShowConfirmModal,selectedItem,setSelectedItem}) =>{
    if(!showConfirmModal) return null
    
    const dispath = useAppDispatch()


    const deleteItem = () =>{
        dispath(deleteAction(selectedItem))
        setSelectedItem(0)
        setShowConfirmModal(false)
      }

    return ReactDom.createPortal(
    <div className='confirm-modal-wrapper'>
        
        <div className='confirm-modal-content'>
            <div>
                <h3>Удалить этот элемент?</h3>
            </div>
            <div className='confirm-modal-control'>
                <button onClick={deleteItem}>Да</button>
                <button onClick={()=> setShowConfirmModal(false)}>Нет</button>
            </div>
        </div>  
    
    </div>
    ,document.getElementById("confirmation-modal") as HTMLDivElement)
}

export default React.memo(СonfirmationModal)