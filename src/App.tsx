import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import TrashSection from './components/TrashSection';
import './App.scss';
import { Grid } from '@mui/material';

function App() {
  return (
    <div className='todoApp'>
      <h1 className='todoApp-title'>Todo List</h1>
      <AddTask />
      <Grid container spacing={2}>
        <Grid item lg={8} xs={12}>
          <TaskList />
          </Grid>
        <Grid item lg={4} xs={12} >
          <TrashSection />
        </Grid>
    </Grid>
    </div>
  );
}

export default App;