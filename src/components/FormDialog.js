import { useRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FormView } from './Form';

import { useForm } from '../queries';

import { getFormId } from '../utils/getFormId';

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

  const formRef = useRef(null);

  if (!open) return null;

  if (error) {
    return 'An error has occurred: ' + (error.variant === 'network-error' ? error.networkError.message : error.response.message);
  }

  if (isLoading) return 'Loading form...';

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
        <FormView schema={ data.schema } onFormInit={ onFormInit } onSubmit={ handleSubmit } />
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose }>Cancel</Button>
        <Button variant="contained" onClick={ onFormSubmit }>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}