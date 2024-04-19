import { expose } from 'comlink'
import { InspectionWorkerOutput, InspectionWorkerStatus } from './types'

export class GraphicsWorker {
  public featureMatching(a: number, b: number): InspectionWorkerOutput {
    let counter = 0
    for (let i = 0; i < 10 ** 9; i++) {
      counter += a + b
    }
    return {
      status: InspectionWorkerStatus.PROCEED,
      data: counter
    }
  }

  public threshold(a: number, b: number): InspectionWorkerOutput {
    let counter = 0
    for (let i = 0; i < 10 ** 9; i++) {
      counter += a + b
    }
    return {
      status: InspectionWorkerStatus.PROCEED,
      data: counter
    }
  }

  public subtraction(a: number, b: number): InspectionWorkerOutput {
    let counter = 0
    for (let i = 0; i < 10 ** 9; i++) {
      counter += a + b
    }
    return {
      status: InspectionWorkerStatus.PROCEED,
      data: counter
    }
  }

  public mergeRects(a: number, b: number): InspectionWorkerOutput {
    let counter = 0
    for (let i = 0; i < 10 ** 9; i++) {
      counter += a + b
    }
    return {
      status: InspectionWorkerStatus.SUCCESS,
      data: counter
    }
  }

  public exit(): void {
    return self.close()
  }
}

expose(new GraphicsWorker())
