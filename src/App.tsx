import AddToDo from './components/AddToDo'
import Todos from './components/Todos'
import store from './store/ToDoStore'
import { Provider } from 'react-redux'
import image from './images/bg-desktop-dark.jpg'
import styles from './App.module.css' 

function App() {
  


  return (
    <>
    <img className={styles.image}src={image} alt="" />
    <header>TODO</header>
    <Provider store={store}>
      <AddToDo />
      <Todos/>
    </Provider>
    </>
  );
}

export default App;
