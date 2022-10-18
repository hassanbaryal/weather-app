const validateForm = (form, input) => {
  if (!form.checkValidity()) {
    input.setCustomValidity('Please enter a minimum of 3 characters!');
    input.reportValidity();
  }

  return form.checkValidity();
};

export default validateForm;
