import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, Paper, TextField } from '@mui/material';

interface TaskFormProps {
  onSubmit: (values: any) => void;
  buttonText: string;
  task?: {
    id: number;
    title: string;
    description?: string;
    deadline?: Date;
    status: 'Pending' | 'Completed' | 'Overdue' | 'Removed';
  };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, buttonText, task }) => {

  const formik = useFormik({
    initialValues: {
      id: task?.id,
      title: task?.title ? task?.title : '',
      description: task?.description ? task?.description : '',
      deadline: task?.deadline ? task.deadline : undefined,
    },

    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string(),
      deadline: Yup.date(),
    }),
    
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });  

  return (
    <Paper elevation={3} className="paper">
      <Typography variant="h6">{buttonText}</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Title"
          id="title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          id="deadline"
          label="Deadline"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.deadline}
          defaultValue={new Date()}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Description"
          id="description"
          name="description"
          multiline
          rows={3}
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <div className="task-buttons">
          <Button type="submit" variant="outlined">
            {buttonText}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default TaskForm;