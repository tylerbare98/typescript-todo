import styles from './Todos.module.css'
import ItemsLeftBar from './ItemsLeftBar'
import CompletionStatusBar from './CompletionStatusBar'
import todoState from '../models/todoState'
import {useSelector, useDispatch} from 'react-redux'
import {GrClose} from "react-icons/gr"

//This component displays all the todos and lets them be switched thorugh drag n drop
const Todos: React.FC<{}> = (props) =>
{

    //state setup
    const storeState: todoState = useSelector((state: todoState) => state)
    const dispatch = useDispatch();

    //-------------------------------- vvvvv ------- handlers ---------------------------
    const deleteHandler = (id) =>
    {
        dispatch({
            type: 'RemoveToDo',
            id: id   
        });
    }

    const checkboxHandler = (id) =>
    {
        dispatch({
            type: 'invertIsChecked',
            id: id   
        });
    }

    function handleDragStart(e, startID) {
        document.getElementById(startID)!.style.opacity = "0.4";

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', startID)
    }

    function handleDragEnd(id) {
        document.getElementById(id)!.style.opacity = "1";
        
        document.getElementsByName('li').forEach(function (item)  {
            item.classList.remove(`${styles.over}`);
        });
    }

    function handleDragOver(e) {
        e.preventDefault();
        return false;
      }
    
    function handleDragEnter(id) {
        document.getElementById(id)!.classList.add(`${styles.over}`);
    }

    function handleDragLeave(id) {
        document.getElementById(id)!.classList.remove(`${styles.over}`);
    }

    function handleDrop(e, endID) {
        e.preventDefault(); 

        document.getElementById(endID)!.classList.remove(`${styles.over}`);
            
        const startID = e.dataTransfer.getData("text");

        //swap element if they are different
        if(startID !== endID)
        {
            //get indexes of two items to be swapped
            const indexStart = storeState.list.map(function(i) { return i.id; }).indexOf(startID);
            const indexEnd = storeState.list.map(function(i) { return i.id; }).indexOf(endID);
            
            //swaps elements in new list then dispatches it
            const newList = storeState.list;
            [newList[indexStart], newList[indexEnd]] = [newList[indexEnd], newList[indexStart]]
            dispatch({
                type: 'DragDrop',
                list: newList   
            });
        }
        return false;
    }
    //-------------------------------- ^^^^^ ------- handlers ---------------------------

    //creates one of the todo elements
    const createTodo = (todo) => {
        return(
            <>
            <div key={todo.id} 
                    id={todo.id}
                    className={styles.todo} 
                    draggable="true" 
                    onDragStart={(e) => handleDragStart(e, todo.id)}
                    onDragOver={(e) => handleDragOver(e)}
                    onDragEnter={() => handleDragEnter(todo.id)}
                    onDragLeave={() => handleDragLeave(todo.id)}
                    onDragEnd={() => handleDragEnd(todo.id)}
                    onDrop={(e) => handleDrop(e, todo.id)}>
                <section>
                    <input type="checkbox"
                        defaultChecked={todo.isChecked}
                        onClick={() => checkboxHandler(todo.id)}/>
                    <span className={styles.label}>{todo.label}</span>
                </section>
                <GrClose
                    className={styles.close} 
                    onClick={() => deleteHandler(todo.id)} />
            </div>
            <hr></hr>
            </>
        )
    }

    //Conditionally render three different views: "all" | "active" | "compelete"
    const completionStatus = storeState.completionStatus;
    let listEmpty;
    let todos;
    let length;
    let updatedList;
    switch(completionStatus){
        case 'all': //use list stored in store as is
            listEmpty = storeState.list.length === 0;
            length = storeState.list.length;
            todos = storeState.list.map(createTodo)
            break;
        case 'active': //new list with only the items that are NOT checked
            updatedList = storeState.list.filter((item) => item.isChecked === false);
            listEmpty = updatedList.length === 0;
            length = updatedList.length;
            todos = updatedList.map(createTodo)
            break;
        case 'complete':  //new list with only the items that ARE checked
            updatedList = storeState.list.filter((item) => item.isChecked === true);
            listEmpty = updatedList.length === 0; 
            length = updatedList.length;
            todos = updatedList.map(createTodo)
            console.log(storeState.list)
            break; 
    }

    
        
    
    return(
        <div className={styles.container}>
            {!listEmpty && todos}
            <div className={styles.footerBar}>
                <ItemsLeftBar length={length}/>
                <CompletionStatusBar />
                <div>Clear Completed</div>
            </div>
        </div>
    )
}

export default Todos;