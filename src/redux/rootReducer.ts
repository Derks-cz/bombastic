import {createSlice} from '@reduxjs/toolkit'

type ListType = {id:number,title:string}

interface InitialState{
    list:ListType[]
}

const initialState:InitialState = {
    list:[]
}


const slice = createSlice({
    name:"root",
    initialState:initialState,
    reducers:{
        add:(state,action)=>{
            state.list.push(action.payload)
        },
        delete:(state,action)=>{
            state.list.splice(action.payload,1)
        }
    }
})

export const addAction = slice.actions.add
export const deleteAction = slice.actions.delete

export default slice.reducer