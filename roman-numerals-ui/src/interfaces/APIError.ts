interface APIError {
  response: {
    status: number,
    data: {
      code: string,
      message: string,
      results: unknown
    }
  }
}

export default APIError;
