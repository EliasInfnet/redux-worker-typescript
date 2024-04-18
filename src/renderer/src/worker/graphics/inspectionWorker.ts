import { expose } from 'comlink'
import { InspectionWorkerOutput, InspectionWorkerStatus } from './types'

export class GraphicsWorker {
  public firstOperation(a: number, b: number): InspectionWorkerOutput {
    return {
      status: InspectionWorkerStatus.PROCEED,
      data: a + b
    }
  }

  public secondOperation(a: number, b: number): InspectionWorkerOutput {
    let counter = 0
    for (let i = 0; i < 10 ** 9; i++) {
      counter += a + b
      if (counter > 10 ** 9.3) {
        this.exit()
        return {
          status: InspectionWorkerStatus.ERROR,
          data: null
        }
      }
    }
    return {
      status: InspectionWorkerStatus.PROCEED,
      data: counter
    }
  }

  public lastOperation(a: number, b: number): InspectionWorkerOutput {
    return {
      status: InspectionWorkerStatus.SUCCESS,
      data: a + b
    }
  }

  public exit(): void {
    return self.close()
  }
}

expose(new GraphicsWorker())
