//import styles from './App.module.css';
import Todos from './components/Todos'
import { v4 as uuid } from 'uuid';
import todo from './models/todo'

function App() {
  
  const todos: todo[] = [{label:"Gym", id:uuid()}, {label:"Eat Food", id:uuid()}]

  return (
    <Todos todos={todos}/>
  );
}

export default App;
