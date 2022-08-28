import todoState from '../models/todoState'
import {useSelector, useDispatch} from 'react-redux'
import {GrClose} from "react-icons/gr"

const Todos: React.FC<{}> = (props) =>
{

    //state setup
    const listState: todoState = useSelector((state: todoState) => state)
    const dispatch = useDispatch();

    //handler
    const deleteHandler = (id) =>
    {
        dispatch({
            type: 'RemoveToDo',
            id: id   
        });
    }

    //creates one of the todo elements
    const createTodo = (todo) => {
        return(
            <li key={todo.id}>{todo.label}: {todo.id} <GrClose onClick={() => deleteHandler(todo.id)}/></li>
        )
    }

    //jsx code to display todos
    let listEmpty = listState.list.length === 0;
    const todos = listState.list.map(createTodo)
    
    //jsx code to display amount of items left
    const length = listState.list.length
    const itemsLeft = length === 1 ? <div>{length} item left</div> : <div>{length} items left</div>

    
    return(
        <>
            {!listEmpty && todos}
            {itemsLeft} 
        </>
    )
}

export default Todos;