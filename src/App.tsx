import { useState } from 'react'
import "./css/App.css"
import Modal from './components/Modal'
import List from './components/List'
import СonfirmationModal from './components/СonfirmationModal'
import { useAppDispatch, useAppSelector } from './redux/redux'
import { deleteAction } from './redux/rootReducer'

function App() {
  const {list} = useAppSelector(s=> s)
  const [showModal, setShowModal] = useState(false)
  const [showConfirmModal,setShowConfirmModal] = useState(false)
  const [selectedItem,setSelectedItem]= useState(0)

  const openModal = () =>{
    setShowModal(true)
  }
  const closeModal = () =>{
    setShowModal(false)
  }

  const openConfirmModal = ()=>{
    if(list.length > 0 && selectedItem > 0 || selectedItem <= list.length -1){
      setShowConfirmModal(true)
    }
  }
  return (
    <div className="App">
     <div className='control'>
        <button onClick={openModal} className='addBtn'>Добавить</button>
        <button onClick={openConfirmModal} className='delBtn'>Удалить</button>
        <button >Тест GraphQL</button>
     </div>
     
      <List setSelectedItem={setSelectedItem} selectedItem={selectedItem} />

     <СonfirmationModal  showConfirmModal={showConfirmModal} setShowConfirmModal={setShowConfirmModal} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
     <Modal showModal={showModal} closeModal={closeModal} />
    </div>
  )
}

export default App
