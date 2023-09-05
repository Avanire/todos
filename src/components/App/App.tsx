import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {TSort, TTask} from "./type";
import sendIcon from '../../assets/images/send-icon.svg';
import TaskItem from "../TaskItem/TaskItem";
import TaskFooter from "../TaskFooter/TaskFooter";
import {emptyListText, placeholder, sendIconAlt, title} from "../../utils/constant";
import styles from './styles.module.css';

const App: FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [tasks, setTasks] = useState<Array<TTask>>([]);
    const [sort, setSort] = useState<TSort>('All');

    const activeTaskCount = useMemo(() => tasks.filter(item => item.status).length, [tasks]);

    const sortedTask = useMemo(() => {
        if (sort === 'Active') {
            return tasks.filter(item => item.status);
        } else if (sort === 'Completed') {
            return tasks.filter(item => !item.status);
        } else {
            return tasks;
        }
    }, [sort, tasks]);

    const addTask = useCallback((text: string) => {
        const task: TTask = {
            id: uuidv4(),
            name: text,
            status: true
        }

        setTasks(prevState => [...prevState, task]);

        const target = inputRef.current as HTMLInputElement;
        target.value = '';
    }, []);

    const handleSendClick = useCallback(() => {
        const target = inputRef.current as HTMLInputElement;
        const text = target.value;

        if (text) {
            addTask(text);
        }
    }, [addTask]);

    const handleKeyboardSubmit = useCallback((e: KeyboardEvent) => {
        const target = inputRef.current as HTMLInputElement;
        const text = target.value;

        if (e.code === 'Enter' && text) {
            addTask(text);
        }
    }, [addTask]);

    const handleChangeCompleteTask = useCallback((id: string) => {
        setTasks(prevState => {
            return prevState.map(item => {
                if (item.id === id) {
                    return {...item, status: !item.status};
                } else {
                    return item;
                }
            });
        });
    }, []);

    const clearCompleted = useCallback(() => {
        setTasks(prevState => {
            return prevState.filter(item => item.status);
        });
    }, []);

    const handleSortTask = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const value = target.innerText as TSort;

        setSort(() => value);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyboardSubmit);

        return () => window.removeEventListener('keydown', handleKeyboardSubmit);
    }, [handleKeyboardSubmit]);

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.block}>
                <div className={styles.inputBlock}>
                    <input type="text" placeholder={placeholder} ref={inputRef} className={styles.input} defaultValue='' />
                    <img src={sendIcon} alt={sendIconAlt} width={32} className={styles.submitIcon} onClick={handleSendClick} />
                </div>
                <div className={styles.taskBlock}>
                    {
                        tasks.length > 0
                        ? sortedTask.map(item => <TaskItem key={uuidv4()} task={item} handleChangeInput={handleChangeCompleteTask} />)
                        : <div className={styles.emptyText}>{emptyListText}</div>
                    }
                </div>
                <TaskFooter active={activeTaskCount} clearCompleted={clearCompleted} sortList={handleSortTask} activeType={sort} />
            </div>
        </main>
    );
}

export default App;
