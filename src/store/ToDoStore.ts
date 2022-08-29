import { createStore } from 'redux'
import todoState from '../models/todoState'

const initial:todoState = {
    list: []
}

function ToDoList(state = initial, action) {
  switch (action.type) {
    case 'AddToDo':
        return {
            list: [...state.list, {label: action.label, id: action.id, isChecked: action.isChecked}]   
        }
    case 'RemoveToDo':
        const updatedList = state.list.filter((item) => item.id !== action.id);
        return {
            list: updatedList
        }
    case 'DragDrop':
        return {
            list: action.list
        }
    case 'checkboxSelected':
        //find index of item that user toggled checkbox
        const index = state.list.findIndex(object => {
            return object.id === action.id
        })
        //invert isChecked bool value
        const newList = state.list;
        if(index !== -1)
        {
            newList[index].isChecked = !newList[index].isChecked;
        }
        return {
            list: newList
        }
    default:
        return state
  }
}

const store = createStore(ToDoList);
export default store;