import { useEffect, useState } from 'react'
import {Snackbar,Alert} from '@mui/material'
import "./css/App.css"
import Modal from './components/Modal'
import List from './components/List'
import СonfirmationModal from './components/СonfirmationModal'
import { useAppSelector } from './redux/redux'
import { useDispatch } from 'react-redux'
import { fetchUser } from './redux/reducers/userReducer'

function App() {
  const dispatch = useDispatch()
  const {user,loaded,error} = useAppSelector(s=> s.user)
  const items = useAppSelector(s=> s.list.items)
  const [showSnackbar,setShowSnackbar] = useState(false)
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
    if(items.length > 0 && selectedItem > 0 || selectedItem <= items.length -1){
      setShowConfirmModal(true)
    }
  }

  const userRequest = ()=>{
    dispatch(fetchUser(4))
  }
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackbar(false);
  };

  useEffect(()=>{
    if(loaded){
      setShowSnackbar(true)
    }
  },[loaded])
  return (
    <div className="App">
     <div className='control'>
        <button onClick={openModal} className='addBtn'>Добавить</button>
        <button onClick={openConfirmModal} className='delBtn'>Удалить</button>
        <button onClick={userRequest} >Тест GraphQL</button>
     </div>
     
      <List setSelectedItem={setSelectedItem} selectedItem={selectedItem} />

     <СonfirmationModal  showConfirmModal={showConfirmModal} setShowConfirmModal={setShowConfirmModal} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
     <Modal showModal={showModal} closeModal={closeModal} />
     
     <Snackbar open={showSnackbar} onClose={handleClose} autoHideDuration={3000} >
       <Alert onClose={handleClose} severity={`${error !== null ? 'error' :"success"}`} sx={{ width: '100%' }}>
          {error !== null ? error : `Пользователь успешно получен id: ${user?.id}, name: ${user?.name}, email: ${user?.email}` }
        </Alert>
    </Snackbar>
   
    </div>
  )
}

export default App
