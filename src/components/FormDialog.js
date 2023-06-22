import { useRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { enqueueSnackbar } from 'notistack';

import { FormView } from './Form';

import { useForm, useVariables } from '../queries';

import { formatVariablesToFormData, getFormId } from '../utils';

export default function FormDialog(props) {

  const {
    open,
    handleClose,
    handleSubmit,
    task
  } = props;

  const { data, isLoading, error } = useForm({
    id: getFormId(task.formKey),
    processDefinitionKey: task.processDefinitionKey,
  });


  const { data: variables, isLoading: loadingVariables, erorr: variablesError } = useVariables({
    taskId: task.id
  });

  const formRef = useRef(null);

  if (!open) return null;

  if (error) {
    enqueueSnackbar('An error has occurred: ' + (error.variant === 'network-error' ? error.networkError.message : error.response.message), {
      variant: 'error'
    });
  }

  if (variablesError) {
    enqueueSnackbar('An error has occurred: ' + (variablesError.variant === 'network-error' ? variablesError.networkError.message : variablesError.response.message), {
      variant: 'error'
    });
  }

  if (isLoading || loadingVariables) return 'Loading form...';

  // todo(pinussilvestrus): replace with a proper form manager
  const onFormInit = (form) => {
    formRef.current = form;
  };

  const onFormSubmit = () => {
    formRef.current.submit();
  };

  return (
    <Dialog
      open={ open }
      onClose={ handleClose }
      fullWidth={ true }
      maxWidth="lg">
      <DialogTitle>{ task.name }</DialogTitle>
      <DialogContent>
        <FormView
          data={ formatVariablesToFormData(variables) }
          schema={ data.schema }
          onFormInit={ onFormInit }
          onSubmit={ handleSubmit } />
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose }>Cancel</Button>
        <Button variant="contained" onClick={ onFormSubmit }>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}