import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name="message"]'),
};

const formData = deserializeData(readFormState(FEEDBACK_FORM_STATE));

if (formData) {
  refs.email.value = formData.email || '';
  refs.message.value = formData.message || '';
}

// ----------------------FUNCTIONS----------------------

function serializeData(data) {
  return JSON.stringify(data);
}

function deserializeData(data) {
  let deserializedData;
  try {
    deserializedData = JSON.parse(data);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
  return deserializedData;
}

function createFormState(key, value) {
  const formState = deserializeData(readFormState(FEEDBACK_FORM_STATE)) || {};
  formState[key] = value;
  localStorage.setItem(FEEDBACK_FORM_STATE, serializeData(formState));
}

function readFormState(key) {
  return localStorage.getItem(key);
}

function deleteFormState(key) {
  localStorage.removeItem(key);
}

// ----------------------EVENT LISTENERS----------------------

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormFieldInput, 500));

// ----------------------EVENT HANDLERS----------------------

function onFormSubmit(event) {
  const { email, message } = event.currentTarget.elements;
  event.preventDefault();

  deleteFormState(FEEDBACK_FORM_STATE);

  console.log({ email: email.value, message: message.value });

  event.currentTarget.reset();
}

function onFormFieldInput({ target }) {
  createFormState(target.name, target.value);
}
