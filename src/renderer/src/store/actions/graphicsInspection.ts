import { Dispatch } from '@reduxjs/toolkit'
import { graphicsInspectionActions } from '../reducers/graphicsInspection'
import { wrap } from 'comlink'
import { GraphicsWorker } from '@renderer/worker/graphics/inspectionWorker'
import { GraphicsTaskStatus, GraphicsTaskSteps } from '@renderer/enum/graphics'
import { store } from '../store'

export const runInspection = (id: string) => async (dispatch: Dispatch) => {
  const worker = new Worker(new URL('../../worker/graphics/inspectionWorker.ts', import.meta.url), {
    type: 'module'
  })

  const startTimestamp = Date.now()

  dispatch(
    graphicsInspectionActions.SET_INSPECTION_STATUS({
      id,
      status: GraphicsTaskStatus.EXECUTING
    })
  )
  const workerWrapped = wrap<GraphicsWorker>(worker)

  dispatch(
    graphicsInspectionActions.SET_INSPECTION_STEP({
      id,
      step: GraphicsTaskSteps.FEATURE_MATCH
    })
  )
  const featureMatch = await workerWrapped.featureMatching(1, 2)

  dispatch(
    graphicsInspectionActions.SET_INSPECTION_STEP({
      id,
      step: GraphicsTaskSteps.THRESHOLD
    })
  )
  const threshold = await workerWrapped.threshold(Number(featureMatch.data), 2)

  dispatch(
    graphicsInspectionActions.SET_INSPECTION_STEP({
      id,
      step: GraphicsTaskSteps.SUBTRACTION
    })
  )
  const subtraction = await workerWrapped.subtraction(Number(threshold.data), 2)
  // if (store.getState().graphicsInspection.status === GraphicsTaskStatus.CANCELED) {
  //   dispatch(graphicsInspectionActions.FINISH_INSPECTION())
  //   dispatch(graphicsInspectionActions.SET_INSPECTION_STEP(GraphicsTaskSteps.ERROR))
  //   return
  // }

  dispatch(
    graphicsInspectionActions.SET_INSPECTION_STEP({
      id,
      step: GraphicsTaskSteps.MERGE_RECTS
    })
  )

  if (store.getState().graphicsInspection[id].status === GraphicsTaskStatus.CANCELED) {
    
    workerWrapped.exit()
    return
  }

  const mergeRects = await workerWrapped.subtraction(Number(subtraction.data), 2)
  console.log(mergeRects)
  dispatch(
    graphicsInspectionActions.SET_INSPECTION_STATUS({
      id,
      status: GraphicsTaskStatus.FINISHED
    })
  )
  const endTimestamp = Date.now()
  dispatch(
    graphicsInspectionActions.SET_INSPECTION_INTERVAL({
      id,
      interval: endTimestamp - startTimestamp
    })
  )
  workerWrapped.exit()
}
