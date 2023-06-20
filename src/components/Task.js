import { useState } from 'react';

import { Fragment } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FormDialog from './FormDialog';

export default function Task(props) {
  const { task } = props;

  const [ dialogOpen, setDialogOpen ] = useState(false);

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
            { task.assignee ? task.assignee : 'Unassigned' }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Pick Task</Button>
          <Button size="small" variant="contained" onClick={ handleOpenDialog }>Open form</Button>
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