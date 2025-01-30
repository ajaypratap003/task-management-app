import React, { useState } from 'react';
import RadioButton from './RadioButton';

type TaskStatusProps = {
    onChange: (status: string) => void;
    status: string;
}

export const TaskStatus: React.FC<TaskStatusProps> = ({ onChange, status: newStatus }) => {
    const [status, setStatus] = useState(newStatus);

    const handleStatusChange = (value: string) => {
        setStatus(value);
        onChange(value);
    };

    return (
        <div>
            <RadioButton label='Completed' value="completed" checked={status === 'completed'} onChange={handleStatusChange}/>
            <RadioButton label='Incompleted' value="incompleted" checked={status === 'incompleted'} onChange={handleStatusChange}/>
        </div>
    );
};

export default TaskStatus;