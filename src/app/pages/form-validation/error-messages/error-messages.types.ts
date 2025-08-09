export type ErrorMessageFn = (err?: any) => string;
export type ValidatorMessages = Record<string, ErrorMessageFn>;
export type FieldMessages = Record<string, ValidatorMessages>;
