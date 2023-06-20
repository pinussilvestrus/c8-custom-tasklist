import { Form } from '@bpmn-io/form-js';

import { useEffect, useRef } from 'react';

import { Container } from '@mui/material';

import '@bpmn-io/form-js/dist/assets/form-js.css';

import './Form.css';

export function FormView(props) {
  const {
    onFormInit,
    onSubmit,
    schema
  } = props;

  const formNodeRef = useRef(null);

  const formRef = useRef(new Form());

  useEffect(() => {
    onFormInit(formRef.current);
  }, [ formRef, onFormInit ]);

  useEffect(() => {
    if (formNodeRef.current) {
      formRef.current.attachTo(formNodeRef.current);
    }

    return () => {
      formRef.current.detach();
    };
  }, [ formNodeRef ]);

  useEffect(() => {
    if (schema) {
      formRef.current.importSchema(JSON.parse(schema));
    }
  }, [ schema ]);

  useEffect(() => {
    formRef.current.on('submit', onSubmit);

    return () => {
      formRef.current.off('submit', onSubmit);
    };
  }, [ formRef ]);

  return (
    <Container>
      <div className="form-container" ref={ formNodeRef }></div>
    </Container>
  );
}