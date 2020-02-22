const joiSanitize = async (schemaName, body) => {
  let message;

  const { error } = schemaName.validate(body);
  if (error) {
    message = error.details.map(field => field.message.replace(/[""]/g, ''));
  }
  return message;
};

export default joiSanitize;
