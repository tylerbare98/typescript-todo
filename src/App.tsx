import AddToDo from './components/AddToDo'
import Todos from './components/Todos'
import CompletionStatusBar from './components/CompletionStatusBar'
//import { v4 as uuid } from 'uuid';
import store from './store/ToDoStore'
import { Provider } from 'react-redux'

function App() {
  


  return (
    <Provider store={store}>
      <AddToDo />
      <Todos/>
      <CompletionStatusBar />
    </Provider>
    
  );
}

export default App;
