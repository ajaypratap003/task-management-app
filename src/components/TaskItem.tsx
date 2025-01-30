import { FC, useState, memo } from 'react';
import './taskitem.css';
import { Task } from '../types';
import { TaskStatus } from './TaskStatus';

export type TaskItemProps = {
    task: Task;
    onEditTask: (id: number, newTitle: string, satus: string) => void;
    onDeleteTask: (id: number) => void;
};

export const TaskItem: FC<TaskItemProps> = memo(({ task, onEditTask, onDeleteTask }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(task.title);
    const [status, setStatus] = useState<string>(task.completed ? 'completed' : 'incompleted');

    const handleEdit = () => {
        if (editTitle.trim()) {
            onEditTask(task.id, editTitle, status);
            setIsEditing(false);
        } else {
            alert('Title cannot be empty');
        }
    };

    const onClickEditTask = () => {
        setIsEditing((prevState) => !prevState);
    }

    const onUpdateStatus = (status: string) => {
        setStatus(status);
    };

    const renderEditButton = () => {
        if (isEditing) {
            return <button onClick={handleEdit}>Update</button>;
        }
        return <button onClick={onClickEditTask}>Edit</button>;
    };

    const renderStatusLabel = () => {
        return task.completed ? 'Completed' : 'Incompleted';
    }

    return (
        <tbody>
            <tr className={task.completed ? 'completed' : 'incomplete'}>
                <td style={{ textAlign: 'start' }}>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                        />
                    ) : (
                        <span>{task.title}</span>
                    )}
                </td>
                <td>
                    {isEditing ? <TaskStatus status={status} onChange={onUpdateStatus} /> : renderStatusLabel()}
                </td>
                <td>
                    {renderEditButton()}
                </td>
                <td>
                    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                </td>
            </tr>
        </tbody>
    );
});