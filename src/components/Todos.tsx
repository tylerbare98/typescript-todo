import todo from '../models/todo'

const Todos: React.FC<{todos: todo[]}> = (props) =>
{
    const createTodo = (todo: todo) => {
        console.log(todo.id)
        return(
                <li key={todo.id}>{todo.label}</li>
        )
    }

    return(
        <>
            {props.todos.map(createTodo)}
        </>
    )
}

export default Todos;