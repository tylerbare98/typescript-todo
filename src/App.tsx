import AddToDo from './components/AddToDo'
import Todos from './components/Todos'
//import { v4 as uuid } from 'uuid';
import store from './store/ToDoStore'
import { Provider } from 'react-redux'

function App() {
  


  return (
    <Provider store={store}>
      <AddToDo />
      <Todos/>
    </Provider>
    
  );
}

export default App;
