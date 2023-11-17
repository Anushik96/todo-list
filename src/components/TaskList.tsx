import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Task from './Task';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div className='taskList'>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
      <>
          {tasks.map((task) => (
            <div key={task.id}>
              <Task task={task} />
            </div>
          ))}</>
      )}
    </div>
  );
};

export default TaskList;