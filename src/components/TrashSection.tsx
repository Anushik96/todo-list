import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { List, ListItem, Typography, Button } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { useDispatch } from 'react-redux';
import { restoreTask } from '../store/tasks/tasksSlice';

const TrashSection: React.FC = () => {
    const trashTasks = useSelector((state: RootState) => state.tasks.trash);
    const dispatch = useDispatch();

    const handleRestore = (taskId: number) => {
      dispatch(restoreTask(taskId));
    };
    
  return (
    <div className="trash-section">
      <h2>Trash List</h2>
      <List className="trash-list">
        {trashTasks.map((task) => (
          <ListItem key={task.id} className="task-item">
            <div className="task-details">
              <div className="task-info">
               <Typography variant="h6">{task.title}</Typography>

                <p>{task.description || 'No description'}</p>
              </div>
              <Button
                variant="contained"
                color="success"
                className="restore-button"
                startIcon={<RestoreIcon />}
                onClick={() => handleRestore(task.id)}
              >
                Restore
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TrashSection;