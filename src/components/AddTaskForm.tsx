import React, { useState, FC, memo } from 'react';
import { Task } from '../types/task';

type AddTaskFormProps = {
    onAddTask: (task: Task) => void;
};

export const AddTaskForm: FC<AddTaskFormProps> = memo(({ onAddTask }) => {
    const [title, setTitle] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim() === '') return;

        const newTask: Task = {
            id: Date.now(),
            title,
            completed: false,
        };
        
        setTitle('');
        onAddTask(newTask);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => onChange(e)} placeholder='Add a new task'/>
            <button type="submit">Add Task</button>
        </form>
    );
});

