import 'regenerator-runtime/runtime';
import { pageSelectors } from './constants/selectors';
import initClientsPage from './clients/clients-page';

window.addEventListener('DOMContentLoaded', () => {
  initClientsPage({
    formSelector: pageSelectors.clientsFieldsForm,
    addFieldButtonSelector: pageSelectors.addFieldButton,
    submitButtonSelector: pageSelectors.submitClientsFormButton,
    fieldsContainerSelector: pageSelectors.clientFieldsContainerSelector,
    spinnerSelector: pageSelectors.spinnerSelector,
    spinnerLoadingClass: pageSelectors.spinnerLoadingClass,
    formErrorClass: pageSelectors.clientsFormErrorClass,
    formErrorMessageSelector: pageSelectors.clientsFormErrorField,
    fieldRawSelector: pageSelectors.fieldRawSelector,
    fieldNameInput: pageSelectors.fieldNameInput,
    selectElementSelector: pageSelectors.selectFieldSelector,
  });
});
