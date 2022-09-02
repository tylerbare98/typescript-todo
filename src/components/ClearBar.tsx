import styles from './ClearBar.module.css'
import todoState from '../models/todoState'
import {useSelector, useDispatch} from 'react-redux'

const ClearBar = () => {

    //state setup
    const storeState: todoState = useSelector((state: todoState) => state)
    const dispatch = useDispatch();

    const clickHandler = () => {
        let updatedList;
        updatedList = storeState.list.filter((item) => item.isChecked === false);
        dispatch({
            type: 'clearCompleted',
            list: updatedList
        });
    }

    return(
        <div className={styles.link}onClick={clickHandler}>Clear Completed</div>
    )
}

export default ClearBar;