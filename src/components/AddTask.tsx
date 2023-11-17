import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasks/tasksSlice';
import { Task } from '../store/tasks/tasksSlice';
import { Button } from '@mui/material';
import TaskForm from './TaskForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AddTask: React.FC = () => {
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState(false);

  const handleAddSubmit = (values: any) => {
    const newTask: Task = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      deadline: values.deadline,
      status: 'Pending',
    };
    dispatch(addTask(newTask));
    setFormVisible(false);
  };

  return (
    <div className="task-form-container">
      <Button onClick={() => setFormVisible(!formVisible)}>
        Add Task <ExpandMoreIcon />
      </Button>
      {formVisible && <TaskForm onSubmit={handleAddSubmit} buttonText="Add Task" />}
    </div>
  );
};

export default AddTask;