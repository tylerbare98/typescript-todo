import styles from './CompletionStatusBar.module.css'
import {useDispatch} from 'react-redux'

const ItemsLeftBar: React.FC<{}> = () => {

    //state
    const dispatch = useDispatch();

    //handlers
    const radioHandler = (e) => {
        dispatch({
            type: 'radioChanged',
            status: e.target.id //the id of the radio button
        });
    }


    return (
        <div className={styles.container}> 
            <label className={styles.labl}>
                <input type="radio" name="radio" id="all" value="one_value" onClick={radioHandler} defaultChecked/>
                <div>All</div>
            </label>
            <label className={styles.labl}>
                <input type="radio" name="radio" id="active" onClick={radioHandler} value="another" />
                <div>Active</div>
            </label>
            <label className={styles.labl}>
                <input type="radio" name="radio" id="complete" onClick={radioHandler} value="another" />
                <div>Complete</div>
            </label>
        </div>
    )
}

export default ItemsLeftBar;