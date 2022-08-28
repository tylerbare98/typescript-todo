import styles from './Todos.module.css'
import todoState from '../models/todoState'
import {useSelector, useDispatch} from 'react-redux'
import {GrClose} from "react-icons/gr"

//This component displays all the todos and lets them be switched thorugh drag n drop
const Todos: React.FC<{}> = (props) =>
{

    //state setup
    const listState: todoState = useSelector((state: todoState) => state)
    const dispatch = useDispatch();

    //handlers
    const deleteHandler = (id) =>
    {
        dispatch({
            type: 'RemoveToDo',
            id: id   
        });
    }

    function handleDragStart(e, startID) {
        // @ts-ignore: Object is possibly 'null'
        document.getElementById(startID).style.opacity = "0.4";  
        let dragSrcElement = document.getElementById(startID);

        //send that startId to the drop function
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', startID)
    }

    function handleDragEnd(id) {
        // @ts-ignore: Object is possibly 'null'
        document.getElementById(id).style.opacity = "1";
        
        document.getElementsByName('li').forEach(function (item)  {
            item.classList.remove(`${styles.over}`);
        });
    }

    function handleDragOver(e) {
        e.preventDefault();
        return false;
      }
    
    function handleDragEnter(id) {
        // @ts-ignore: Object is possibly 'null'
        document.getElementById(id).classList.add(`${styles.over}`);
    }

    function handleDragLeave(id) {
        // @ts-ignore: Object is possibly 'null'
        document.getElementById(id).classList.remove(`${styles.over}`);
    }

    function handleDrop(e, endID) {
        e.preventDefault(); 

        // @ts-ignore: Object is possibly 'null'
        document.getElementById(endID).classList.remove(`${styles.over}`);
            
        const startID = e.dataTransfer.getData("text");

        //swap element if they are different
        if(startID !== endID)
        {
            //get indexes of two items to be swapped
            const indexStart = listState.list.map(function(i) { return i.id; }).indexOf(startID);
            const indexEnd = listState.list.map(function(i) { return i.id; }).indexOf(endID);
            
            //swaps elements in new list then dispatches it
            const newList = listState.list;
            [newList[indexStart], newList[indexEnd]] = [newList[indexEnd], newList[indexStart]]
            dispatch({
                type: 'DragDrop',
                list: newList   
            });
        }
        return false;
    }

    //creates one of the todo elements
    const createTodo = (todo) => {
        return(
            <li key={todo.id} 
                id={todo.id} 
                draggable="true" 
                onDragStart={(e) => handleDragStart(e, todo.id)}
                onDragOver={(e) => handleDragOver(e)}
                onDragEnter={() => handleDragEnter(todo.id)}
                onDragLeave={() => handleDragLeave(todo.id)}
                onDragEnd={() => handleDragEnd(todo.id)}
                onDrop={(e) => handleDrop(e, todo.id)}>
                <span className={styles.mouse}>{todo.label}: {todo.id}</span>
                <GrClose onClick={() => deleteHandler(todo.id)} />
            </li>
            
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