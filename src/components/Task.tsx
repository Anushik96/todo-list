import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, markAsComplete } from '../store/tasks/tasksSlice';
import EditTask from './EditTask';
import { Button, Typography, Card, CardContent } from '@mui/material';

interface TaskProps {
  task: {
    id: number;
    title: string;
    description?: string;
    deadline?: Date;
    status: 'Pending' | 'Completed' | 'Overdue' | 'Removed';
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);

  const handleRemove = () => {
    dispatch(removeTask(task.id));
  };

  const handleComplete = () => {
    dispatch(markAsComplete(task.id));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const closeEditForm = () => {
    setEditing(false);
  };

  return (
    <Card sx={{ minWidth: 275 }} className='singleTask'>
      <CardContent>

        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2">Status: <span className={task.status}></span> {task.status}</Typography>
        <Typography variant="body2">Description: {task.description || 'No description'}</Typography>
        <Typography variant="body2">Deadline: {task.deadline?.toString() || 'No deadline'}</Typography>

        {task.status === 'Pending' && (
          <div className="task-buttons">
            <Button variant="outlined" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="outlined" onClick={handleRemove}>
              Remove
            </Button>
            <Button variant="outlined" onClick={handleComplete}>
              Mark as Complete
            </Button>
          </div>
        )}

        {isEditing && <EditTask task={task} onClose={closeEditForm} />}
      </CardContent>
    </Card>
  );
};

export default Task;