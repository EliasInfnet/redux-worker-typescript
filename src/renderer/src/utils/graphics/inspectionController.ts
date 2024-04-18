import { PromisifiedWorker } from '.'

export const inspect = async () => {
  const worker = new PromisifiedWorker('../../worker/graphics/inspectionWorker.ts', 10000)
  const response = await worker.postMessage('teste')
  console.log(response)
}

inspect()
