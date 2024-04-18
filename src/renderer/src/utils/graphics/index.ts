import cv from 'opencv-ts'

export class PromisifiedWorker {
  constructor(workerPath, timeout = 5000) {
    this.worker = new Worker(workerPath)
    this.worker.onmessage = this.handleMessage.bind(this)
    this.worker.onerror = this.handleError.bind(this)
    this.callbacks = {}
    this.nextCallbackId = 0
    this.timeout = timeout
  }

  handleMessage(event: unknown): any {
    const { id, data, error } = event.data

    if (id && this.callbacks[id]) {
      if (error) {
        this.callbacks[id].reject(error)
      } else {
        this.callbacks[id].resolve(data)
      }
      delete this.callbacks[id]
    }
  }

  handleError(error) {
    console.error('Worker error:', error)
  }

  postMessage(data) {
    const id = this.nextCallbackId++
    return new Promise((resolve, reject) => {
      this.callbacks[id] = { resolve, reject }
      this.worker.postMessage({ id, data })

      // Set a timeout to reject the promise if no response is received within the specified time
      const timeoutId = setTimeout(() => {
        delete this.callbacks[id]
        reject(new Error('Timeout exceeded'))
      }, this.timeout)

      // Remove the timeout if the promise is resolved or rejected before the timeout
      const clear = () => clearTimeout(timeoutId)
      this.callbacks[id].resolve = (...args) => {
        clear()
        resolve(...args)
      }
      this.callbacks[id].reject = (...args) => {
        clear()
        reject(...args)
      }
    })
  }

  terminate() {
    this.worker.terminate()
  }
}
