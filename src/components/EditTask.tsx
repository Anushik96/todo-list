import React from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../store/tasks/tasksSlice';
import { Task } from '../store/tasks/tasksSlice';
import { Typography } from '@mui/material';
import TaskForm from './TaskForm';

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
}

const EditTask: React.FC<EditTaskFormProps> = ({ task, onClose }) => {
  const dispatch = useDispatch();

  const handleEditSubmit = (values: any) => {
    const editedTask: Task = {
      ...task,
      title: values.title,
      description: values.description,
      deadline: values.deadline ?  values.deadline : undefined,
    };
    dispatch(editTask(editedTask));
    onClose();
  };

  return (
    <div className="task-form-container">
      <Typography variant="h6">Edit Task</Typography>
      <TaskForm onSubmit={handleEditSubmit} buttonText="Save Changes" task={task} />
    </div>
  );
};

export default EditTask;