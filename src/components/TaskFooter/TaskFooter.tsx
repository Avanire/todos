import React, {FC} from "react";
import styles from './styles.module.css';
import {TTaskFooter} from "./type";
import {tabs} from "../../utils/constant";

const TaskFooter: FC<TTaskFooter> = ({active, clearCompleted, sortList, activeType}) => {

    return (
        <div className={styles.footer}>
            <div>{active} задачь осталось</div>
            <div onClick={sortList} className={styles.tabs}>
                {
                    tabs.map((item, index) => <div key={index} className={`${styles.tab} ${activeType === item && styles.active}`}>{item}</div>)
                }
            </div>
            <button type='button' onClick={clearCompleted} className={styles.clearBtn}>Очистить завершенные</button>
        </div>
    );
}

export default TaskFooter;
