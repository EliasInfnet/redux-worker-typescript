import { Dispatch } from '@reduxjs/toolkit'
import { graphicsInspectionActions } from '../reducers/graphicsInspection'
import { wrap } from 'comlink'
import { GraphicsWorker } from '@renderer/worker/graphics/inspectionWorker'
import { InspectionWorkerStatus } from '@renderer/worker/graphics/types'

export const runInspection = () => async (dispatch: Dispatch) => {
  const worker = new Worker(new URL('../../worker/graphics/inspectionWorker.ts', import.meta.url), {
    type: 'module'
  })
  dispatch(graphicsInspectionActions.START_INSPECTION())
  const workerWrapped = wrap<GraphicsWorker>(worker)
  const firstResult = await workerWrapped.firstOperation(1, 2)
  const secondResult = await workerWrapped.secondOperation(Number(firstResult.data), 2)
  if (secondResult.status === InspectionWorkerStatus.ERROR) {
    dispatch(graphicsInspectionActions.PAUSE_INSPECTION())
  }
  await workerWrapped.lastOperation(Number(secondResult.data), 3)
  dispatch(graphicsInspectionActions.FINISH_INSPECTION())
}
