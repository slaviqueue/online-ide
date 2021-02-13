class HealthcheckTimeoutError extends Error {
  public constructor () {
    super('Container was starting too long. Try again')
  }
}

export default HealthcheckTimeoutError
