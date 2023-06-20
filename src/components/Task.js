import { useState } from 'react';

import { Fragment } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FormDialog from './FormDialog';

import { useAssignTask } from '../mutations';
import { useUnassignTask } from '../mutations';

export default function Task(props) {
  const { task } = props;

  const [ dialogOpen, setDialogOpen ] = useState(false);

  const { mutateAsync: assignTask } = useAssignTask();
  const { mutateAsync: unassignTask } = useUnassignTask();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCompleteTask = (event) => {
    console.log('submit', event);

    // todo(pinussilvestrus): complete task
  };

  const handleAssignTask = () => {
    assignTask({
      taskId: task.id,

      // todo(pinussilvestrus): get current user when not using access token
      assignee: 'niklas.kiefer@camunda.com'
    });
  };

  const handleUnassignTask = () => {
    unassignTask(task.id);
  };

  return (
    <Fragment>
      <Card sx={ { minWidth: 275 } }>
        <CardContent>
          <Typography sx={ { fontSize: 14 } } color="text.secondary" gutterBottom>
            { task.creationDate }
          </Typography>
          <Typography variant="h5" component="div">
            { task.name }
          </Typography>
          <Typography sx={ { mb: 1.5 } } color="text.secondary">
            { task.processName }
          </Typography>
          <Typography variant="body2">
            { isAssigned(task) ? task.assignee : 'Unassigned' }
          </Typography>
        </CardContent>
        <CardActions>
          { !isAssigned(task) && (
            <Button
              size="small"
              onClick={ handleAssignTask }>Pick Task</Button>
          )}
          { isAssigned(task) && (
            <Button
              size="small"
              onClick={ handleUnassignTask }>Unassign</Button>
          )}
          <Button
            disabled={ !isAssigned(task) }
            size="small" variant="contained"
            onClick={ handleOpenDialog }>Fill</Button>
        </CardActions>
      </Card>
      <FormDialog
        task={ task }
        open={ dialogOpen }
        handleClose={ handleCloseDialog }
        handleSubmit={ handleCompleteTask } />
    </Fragment>
  );
}


// helper ////////

function isAssigned(task) {
  return !!task.assignee;
}