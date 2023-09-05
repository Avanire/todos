import React, {FC} from "react";
import styles from './styles.module.css';
import {TTaskFooter} from "./type";
import {cancelBtn, tabs} from "../../utils/constant";

const TaskFooter: FC<TTaskFooter> = ({active, clearCompleted, sortList, activeType}) => {

    return (
        <div className={styles.footer}>
            <div><span id='active-task-count'>{active}</span> задачь осталось</div>
            <div onClick={sortList} className={styles.tabs}>
                {
                    tabs.map((item, index) => <div key={index} className={`${styles.tab} ${activeType === item && styles.active}`} id={item}>{item}</div>)
                }
            </div>
            <button type='button' onClick={clearCompleted} className={styles.clearBtn} id='task-cancel-btn'>{cancelBtn}</button>
        </div>
    );
}

export default TaskFooter;
