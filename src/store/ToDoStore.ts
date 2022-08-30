import { createStore } from 'redux'
import todoState from '../models/todoState'


const initial:todoState = {
    list: [],
    completionStatus: "all" 
}

function ToDoList(state = initial, action) {
  switch (action.type) {
    case 'AddToDo':
        return {
            list: [...state.list, {label: action.label, id: action.id, isChecked: action.isChecked}],
            completionStatus: state.completionStatus  
        }
    case 'RemoveToDo':
        const updatedList = state.list.filter((item) => item.id !== action.id);
        return {
            list: updatedList,
            completionStatus: state.completionStatus 
        }
    case 'DragDrop':
        return {
            list: action.list,
            completionStatus: state.completionStatus 
        }
    case 'invertIsChecked':
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
            list: newList,
            completionStatus: state.completionStatus 
        }
    case "radioChanged":
        return {
            list: state.list,
            completionStatus: action.status
        }
    default:
        return state
  }
}

const store = createStore(ToDoList);
export default store;