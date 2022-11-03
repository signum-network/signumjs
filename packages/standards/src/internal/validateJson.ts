import { formatJsonValidationErrorMessage } from './formatJsonValidationErrorMessage';

interface Args<T> {
  data: T;
  schema: object;
  validator: Function;
}

export function validateJson<T extends object>(
  args: Args<T>
): { isValid: boolean; error?: string } {
  const { data, validator, schema } = args;
  if (!validator(data)) {
    const error = formatJsonValidationErrorMessage({
      schema,
      data,
      // @ts-ignore
      errors: validator.errors,
    });
    return { isValid: false, error };
  }
  return {
    isValid: true,
  };
}
