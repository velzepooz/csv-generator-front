import { addField, initForm } from './clients-form';

export default function initClientsPage({
  formSelector,
  addFieldButtonSelector,
  submitButtonSelector,
  fieldsContainerSelector,
  spinnerSelector,
  spinnerLoadingClass,
  formErrorClass,
  formErrorMessageSelector,
  fieldRawSelector,
  fieldNameInput,
  selectElementSelector,
}) {
  const button = document.querySelector(addFieldButtonSelector);

  button.addEventListener('click', () => addField({
    containerSelector: fieldsContainerSelector,
    fieldRawSelector,
    fieldNameInput,
    selectElementSelector,
  }));

  initForm({
    formSelector,
    submitButtonSelector,
    addFieldButtonSelector,
    spinnerSelector,
    spinnerLoadingClass,
    formErrorClass,
    formErrorMessageSelector,
  });
}
