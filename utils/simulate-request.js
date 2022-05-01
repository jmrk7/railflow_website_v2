const simulateRequest = (ms = 2000, canThrowRandomError = false) =>
  new Promise((resolve, reject) => {
    const shouldThrowError = Math.random() > 0.9

    if (canThrowRandomError && shouldThrowError) {
      setTimeout(reject, ms)
    }

    setTimeout(resolve, ms)
  })

export default simulateRequest
