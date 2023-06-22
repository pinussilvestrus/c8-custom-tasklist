import { useState } from 'react';

import { Fragment } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import { enqueueSnackbar } from 'notistack';

import FormDialog from './FormDialog';

import {
  useAssignTask,
  useCompleteTask,
  useUnassignTask
} from '../mutations';

import { formatDate } from '../utils';

// todo(pinussilvestrus): get current user when not using access token
const ASSIGNEE = 'niklas.kiefer@camunda.com';

export default function Task(props) {
  const { task } = props;

  const [ assignee, setAssignee ] = useState(task.assignee);

  const [ dialogOpen, setDialogOpen ] = useState(false);

  const { mutateAsync: assignTask } = useAssignTask();
  const { mutateAsync: unassignTask } = useUnassignTask();
  const { mutateAsync: completeTask } = useCompleteTask();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCompleteTask = async (event) => {
    console.log('submit', event);

    if (Object.keys(event.errors).length) {
      return;
    }

    setDialogOpen(false);

    const variables = Object.entries(event.data).map(
      ([ name, value ]) =>
        ({
          name,
          value: JSON.stringify(value),
        })
    );

    try {
      await completeTask({
        taskId: task.id,
        variables
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }

    enqueueSnackbar('Task completed!', {
      variant: 'success'
    });
  };

  const handleAssignTask = async () => {
    try {
      await assignTask({
        assignee: ASSIGNEE,
        taskId: task.id
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }

    setAssignee(ASSIGNEE);
  };

  const handleUnassignTask = async () => {

    try {
      await unassignTask(task.id);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }

    setAssignee(null);
  };

  return (
    <Fragment>
      <Card sx={ { minWidth: 275 } }>
        <CardContent>
          <Typography sx={ { fontSize: 14 } } color="text.secondary" gutterBottom>
            { formatDate(task.creationDate, true) }
          </Typography>
          <Typography variant="h5" component="div">
            { task.name }
          </Typography>
          <Typography sx={ { mb: 1.5 } } color="text.secondary">
            { task.processName }
          </Typography>
          <Typography variant="body2">
            <Chip label={ assignee || 'Unassigned' } variant={ !isAssigned(assignee) ? 'outlined' : '' } />
          </Typography>
        </CardContent>
        <CardActions>
          { !isAssigned(assignee) && (
            <Button
              size="small"
              onClick={ handleAssignTask }>Pick Task</Button>
          )}
          { isAssigned(assignee) && (
            <Button
              size="small"
              onClick={ handleUnassignTask }>Unassign</Button>
          )}
          <Button
            disabled={ !isAssigned(assignee) }
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

function isAssigned(assignee) {
  return !!assignee;
}