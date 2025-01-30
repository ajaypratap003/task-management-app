import { FC, memo } from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

export type TaskListProps = {
    tasks: Task[];
    onEditTask: (id: number, newTitle: string, satus: string) => void;
    onDeleteTask: (id: number) => void;
};

export const TaskList: FC<TaskListProps> = memo(({ tasks, onEditTask, onDeleteTask }) => {

    return (
        <table>
            {tasks?.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                />
            ))}
        </table>
    );

});