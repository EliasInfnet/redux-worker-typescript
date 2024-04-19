import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GraphicsTaskStatus, GraphicsTaskSteps } from '@renderer/enum/graphics'
import { GraphicsInspection, GraphicsInspections } from '@renderer/types/graphics'
import inspections from '../../../mock/graphicsInspection'

export const graphicsInspectionSlice = createSlice({
  name: 'graphicsInspection',
  initialState: inspections,
  reducers: {
    SET_INSPECTION_STEP(
      state: GraphicsInspections,
      data: PayloadAction<{ id: string; step: GraphicsTaskSteps }>
    ) {
      state[data.payload.id].step = data.payload.step
    },
    SET_INSPECTION_STATUS(
      state: GraphicsInspections,
      data: PayloadAction<{ id: string; status: GraphicsTaskStatus }>
    ) {
      state[data.payload.id].status = data.payload.status
    },
    SET_INSPECTION_INTERVAL(
      state: GraphicsInspections,
      data: PayloadAction<{ id: string; interval: number }>
    ) {
      state[data.payload.id].interval = data.payload.interval
    }
  },
  selectors: {
    getInspections: (state: GraphicsInspections): GraphicsInspection[] => {
      return Object.values(state)
    },
    getInspectionStatusSelector: (
      state: GraphicsInspections,
      id: string
    ): GraphicsTaskStatus | null => {
      return state[id].status
    },
    getInspectionStepSelector: (
      state: GraphicsInspections,
      id: string
    ): GraphicsTaskSteps | null => {
      return state[id].step
    }
  }
})

export const graphicsInspectionActions = graphicsInspectionSlice.actions
export const graphicsInspectionSelectors = graphicsInspectionSlice.selectors
