import betterAjvErrors from 'better-ajv-errors';

interface Args {
  schema: object;
  data: object;
  errors: object[];
}

export function formatJsonValidationErrorMessage({ schema, data, errors }: Args): string {
  // @ts-ignore
  const output = betterAjvErrors(schema, data, errors, {
    format: 'js',
  });

  // @ts-ignore
  return output.map(({ error }) => error).join(',');
}
