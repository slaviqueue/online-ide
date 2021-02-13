function wait (millis: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, millis))
}

export default wait
