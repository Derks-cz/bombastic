import React, { Dispatch, SetStateAction, useState } from 'react'
import '../css/list.css'
import { useAppSelector } from '../redux/redux'

interface ListProps {
    setSelectedItem: Dispatch<SetStateAction<number>>
    selectedItem:number
}

const List:React.FC<ListProps> = ({setSelectedItem,selectedItem}) =>{
    const selector = useAppSelector(selector => selector.list)

    const selectItem = (index:number) =>{
        if(index == selectedItem) return
        setSelectedItem(index)

    }

    return (    
    <div className='list-wrap'>
            <ul>
                {selector.map((l,i)=>(
                    <li style={{border: selectedItem ===i ? "2px solid green":"none"}} onClick={()=>selectItem(i)} key={l.id}>{l.title}</li>
                ))}
           </ul>
    </div>
    )
}

export default List