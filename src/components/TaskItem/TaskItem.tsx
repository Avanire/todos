import {FC} from "react";
import {TTaskItem} from "../App/type";
import styles from './styles.module.css';

const TaskItem: FC<TTaskItem> = ({task, handleChangeInput}) => {
    return (
        <>
            <input type="checkbox" id={task.id} checked={!task.status} onChange={() => handleChangeInput(task.id)} className={styles.input}/>
            <label htmlFor={task.id} className={styles.testText}>
                {task.name}
            </label>
        </>
    );
}

export default TaskItem;
