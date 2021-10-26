import { systemFields } from '../constants/csv-generator-fields';
import {
  getFileNameFromContentDisposition,
  parseFileTypeFromContentType,
} from '../helpers/parse-headers';
import { downloadFile } from '../helpers/file-helpers';
import { postRequest } from '../api/requests';
import { ROUTES } from '../api/routes';
import { setCssClass } from '../helpers/view-helpers';

export function initForm({
  formSelector,
  submitButtonSelector,
  addFieldButtonSelector,
  spinnerSelector,
  spinnerLoadingClass,
  formErrorClass,
  formErrorMessageSelector,
}) {
  const form = document.querySelector(formSelector);

  form.addEventListener('submit', async(event) => {
    event.preventDefault();

    setLoading({
      spinnerSelector,
      spinnerLoadingClass,
      isLoading: true,
    });

    setButtonsDisabled({
      submitButtonSelector,
      addFieldButtonSelector,
      isDisabled: true,
    });

    const inputs = form.querySelectorAll('input');
    const data = getFormData(inputs);

    try {
      const responseData = await submitForm(data);

      setLoading({
        spinnerSelector,
        spinnerLoadingClass,
        isLoading: false,
      });

      setButtonsDisabled({
        submitButtonSelector,
        addFieldButtonSelector,
        isDisabled: false,
      });

      if (responseData && responseData.statusCode === 400) {
        setFormError({
          errorFieldsSelector: formErrorMessageSelector,
          errorMessage: responseData.message.join('\n'),
          formSelector,
          errorClass: formErrorClass,
          isError: true,
        });
      }
    } catch (e) {
      setLoading({
        spinnerSelector,
        spinnerLoadingClass,
        isLoading: false,
      });

      setButtonsDisabled({
        submitButtonSelector,
        addFieldButtonSelector,
        isDisabled: false,
      });

      setFormError({
        errorFieldsSelector: formErrorMessageSelector,
        errorMessage: 'Server error. Try again!',
        formSelector,
        errorClass: formErrorClass,
        isError: true,
      });
    }
  });
}

export function addField({
  containerSelector,
  selectElementSelector,
  fieldRawSelector,
  fieldNameInput,
}) {
  const container = document.querySelector(containerSelector);

  container.insertAdjacentHTML('beforeend', generateInput());

  const newElement = container.querySelector(`${fieldRawSelector}:last-child`);

  handleSelectField({
    parentElement: newElement,
    selectElementSelector,
    fieldRawSelector,
    fieldNameInput,
  });
}

function handleSelectField({
  parentElement,
  selectElementSelector,
  fieldRawSelector,
  fieldNameInput,
}) {
  const select = parentElement.querySelector(
    `${selectElementSelector}`,
  );

  select.addEventListener('click', (event) => {
    const div = select.closest(fieldRawSelector);
    const input = div.querySelector(fieldNameInput);

    input.name = event.target.value;
  });
}

async function submitForm(dataToSend) {
  // eslint-disable-next-line no-undef
  const response = await postRequest(ROUTES.CSV_GENERATOR, dataToSend);

  if (response.status !== 201) {
    return response.json();
  }

  const reader = response.body.getReader();
  const { value } = await reader.read();

  const fileType = parseFileTypeFromContentType(
    response.headers.get('content-type'),
  );
  const fileName = getFileNameFromContentDisposition(
    response.headers.get('content-disposition'),
  );

  downloadFile(fileName, fileType, value);
}

function generateInput() {
  return `
    <div class="row client-field">
      <div class="col-md-6 mb-3">
        <input type="text" class="form-control field-name" placeholder="Enter field name" name="" required="">
      </div>
      <div class="col-md-6 mb-3">
        <select class="custom-select d-block w-100 select-field">
         <option value="">Choose field type...</option>
           ${systemFields.map((field) => (`<option value="${field.systemName}">${field.friendlyName}</option>`))}
        </select>
       </div>
    </div>`;
}

function setLoading({
  spinnerSelector,
  spinnerLoadingClass,
  isLoading = false,
}) {
  setCssClass({
    elementSelector: spinnerSelector,
    newClass: spinnerLoadingClass,
    toAdd: isLoading,
  });
}

function setButtonsDisabled({
  submitButtonSelector,
  addFieldButtonSelector,
  isDisabled = false,
}) {
  const submitButton = document.querySelector(submitButtonSelector);
  const addFieldButton = document.querySelector(addFieldButtonSelector);

  submitButton.disabled = isDisabled;
  addFieldButton.disabled = isDisabled;
}

function setFormError({
  errorFieldsSelector,
  errorMessage = '',
  formSelector,
  errorClass,
  isError,
}) {
  const errorField = document.querySelector(errorFieldsSelector);

  errorField.innerText = errorMessage;

  errorField.innerText = errorMessage;

  setFormErrorStyle({
    formSelector,
    errorClass,
    isError,
  });
}

function setFormErrorStyle({
  formSelector,
  errorClass,
  isError,
}) {
  setCssClass({
    elementSelector: formSelector,
    newClass: errorClass,
    toAdd: isError,
  });
}

function getFormData(formInputs) {
  const data = {
    fields: {},
  };

  formInputs.forEach((input) => {
    if (input.id === '#numberOfClients') {
      data.numberOfClients = +input.value;
    } else {
      data.fields[input.value] = input.name;
    }
  });

  return data;
}
