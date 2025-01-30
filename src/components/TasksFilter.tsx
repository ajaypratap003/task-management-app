import React, { useState } from 'react';
import RadioButton from './RadioButton';

type TasksFilterProps = {
    onFilterChange: (filter: string) => void;
}

export const TasksFilter: React.FC<TasksFilterProps> = ({ onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    const handleFilterChange = (value: string) => {
        setSelectedFilter(value);
        onFilterChange(value);
    };

    return (
        <div>
            <label>Filter:</label>
             <RadioButton label='Completed' value="completed" checked={selectedFilter === 'completed'} onChange={handleFilterChange}/>
             <RadioButton label='Incompleted' value="incompleted" checked={selectedFilter === 'incompleted'} onChange={handleFilterChange}/>
             <RadioButton label='All' value="all" checked={selectedFilter === 'all'} onChange={handleFilterChange}/>
        </div>
    );
};

export default TasksFilter;