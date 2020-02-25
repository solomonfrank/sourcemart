export const respondWithSuccess = (
  res,
  statusCode = 200,
  message,
  additionalFields = {}
) => {
  const payload = Array.isArray(additionalFields)
    ? [...additionalFields]
    : { ...additionalFields };

  return res.status(statusCode).send({ success: true, message, payload });
};
