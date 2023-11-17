import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  title: string;
  description?: string;
  deadline?: Date;
  status: 'Pending' | 'Completed' | 'Overdue' | 'Removed';
}

interface TasksState {
  tasks: Task[];
  trash: Task[];
}

const initialState: TasksState = {
  tasks: [],
  trash: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        deadline: action.payload.deadline,
        status: 'Pending',
      };

      if (newTask.deadline && (new Date(newTask.deadline) < new Date())) {
        newTask.status = 'Overdue';
      }

      state.tasks.push(newTask);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.deadline = action.payload.deadline;

        if (task.deadline && new Date(task.deadline) < new Date()) {
          task.status = 'Overdue';
        }
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.status = 'Removed';
        state.trash.push(task);
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      }
    },
    markAsComplete: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task && task.status !== 'Overdue') {
        task.status = 'Completed';
      }
    },
     restoreTask: (state, action: PayloadAction<number>) => {
      const task = state.trash.find((t) => t.id === action.payload);
      if (task) {
        task.status = 'Pending'; 
        state.tasks.push(task);
        state.trash = state.trash.filter((t) => t.id !== action.payload);
      }
    },
  },
});

export const {
  addTask,
  editTask,
  removeTask,
  markAsComplete,
  restoreTask
} = tasksSlice.actions;
export default tasksSlice.reducer;