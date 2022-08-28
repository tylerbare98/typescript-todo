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
      return state
    default:
      return state
  }
}

const store = createStore(ToDoList);
export default store;