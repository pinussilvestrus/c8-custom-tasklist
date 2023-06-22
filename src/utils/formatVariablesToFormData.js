export function formatVariablesToFormData(variables) {
  return variables.reduce(
    (accumulator, { name, value }) => ({
      ...accumulator,
      [name]: JSON.parse(value),
    }),
    {},
  );
}