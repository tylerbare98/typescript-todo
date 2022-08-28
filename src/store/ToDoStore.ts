import { createStore } from 'redux'
import todoState from '../models/todoState'

const initial:todoState = {
    list: []
}

function ToDoList(state = initial, action) {
  switch (action.type) {
    case 'AddToDo':
        return {
            list: [...state.list, {label: action.label, id: action.id}]   
        }
    case 'RemoveToDo':
        const updatedList = state.list.filter((item) => item.id !== action.id);
        return {
            list: updatedList
        }
    default:
        return state
  }
}

const store = createStore(ToDoList);
export default store;