import { FC, useState, useCallback, useEffect } from 'react';
import { Task } from '../types';
import { AddTaskForm, TaskList, TasksFilter } from '../components';
import { debounce } from '../utils/task-utils';

const TaskManagementPage: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    const onFilterChange = useCallback((value: string) => {
        if (value === 'all') {
            setFilteredTasks(tasks);
        } else {
            const newFilteredTasks = tasks.filter((task) => task.completed === (value === 'completed'));
            setFilteredTasks(newFilteredTasks);
        }
    }, [tasks]);

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    const addTask = useCallback((newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }, [tasks]);


    const onEditTask = useCallback((id: number, newTitle: string, status: string) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                const newStatus = status === 'completed';
                return { ...task, title: newTitle, completed: newStatus };
            }
            return task;
        });

        setTasks(updatedTasks);
    }, [tasks]);


    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    /**
     * Load tasks from local storage when the page is loaded
     */
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    /**
     * Save tasks to local storage when tasks are updated
     */
    const saveTasksToLocalStorage = debounce(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, 1000);

    useEffect(() => {
        saveTasksToLocalStorage();
    }, [tasks]);


    const onDeleteTask = useCallback((id: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    }, [tasks]);

    return (
        <div className="task-management">
            <h1>Task Management App</h1>
            <TasksFilter onFilterChange={onFilterChange} />
            <AddTaskForm onAddTask={addTask} />
            <div className="task-management task-list-container">
                <TaskList
                    tasks={filteredTasks}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                />
            </div>
        </div>
    );
};

export default TaskManagementPage;