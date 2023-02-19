import { Reducer } from 'redux';
interface Item {
    id: number;
    title: string;
  }
  
  interface State {
    items: Item[] | [];
  }
  
  interface AddItemAction {
    type: 'ADD_ITEM';
    payload: Item;
  }
  
  interface DeleteItemAction {
    type: 'DELETE_ITEM';
    payload: number;
  }
  
  type Action = AddItemAction | DeleteItemAction;
  
  const initialState: State = {
    items: []
  };
  
  const reducer: Reducer<State, Action> = (state = initialState, action: Action): State => {
    switch (action.type) {
      case 'ADD_ITEM':
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      case 'DELETE_ITEM':
        return {
          ...state,
          items: state.items.filter((_,i) => i !== action.payload)
        };
      default:
        return state;
    }
  };
  
  export default reducer;

  export const addItemAction = (payload:Item) => ({type:"ADD_ITEM",payload})
  export const dleteItemAction = (payload:number) => ({type:"DELETE_ITEM",payload})