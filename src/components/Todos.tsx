import todoState from '../models/todoState'
import {useSelector} from 'react-redux'

const Todos: React.FC<{}> = (props) =>
{

    //state setup
    const listState: todoState = useSelector((state: todoState) => state)

    //creates one of the todo elements
    const createTodo = (todo) => {
        return(
            <li key={todo.id}>{todo.label}</li>
        )
    }

    //jsx code to return to display todos
    const todos = listState.list.map(createTodo)

    return(
        <>
            {todos}
        </>
    )
}

export default Todos;