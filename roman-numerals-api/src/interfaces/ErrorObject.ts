interface ErrorObject {
  status?: number,
  code?: string,
  message?: string | {
    [key: string]: string;
  }
}

export default ErrorObject;
