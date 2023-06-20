const CAMUNDA_FORMS_PREFIX = 'camunda-forms:bpmn:';

export function isCamundaForms(formKey) {
  return formKey.startsWith(CAMUNDA_FORMS_PREFIX);
}

export function getFormId(formKey) {
  return formKey.replace(CAMUNDA_FORMS_PREFIX, '');
}
