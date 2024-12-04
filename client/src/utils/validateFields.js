export const validateFields = (fields) => {
  const errors = {};
  let isValid = true;

  Object.keys(fields).forEach((key) => {
    if (!fields[key]) {
      isValid = false;
      errors[key] = "This field is required";
    } else {
      errors[key] = ""; // Clear previous errors
    }
  });

  return { isValid, errors };
};
