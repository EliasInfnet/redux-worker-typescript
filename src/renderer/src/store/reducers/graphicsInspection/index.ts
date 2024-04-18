import { createSlice } from '@reduxjs/toolkit'
import { GraphicsTaskStatus } from '@renderer/enum/graphics'
import { GraphicsInspection } from '@renderer/types/graphics'

const initialState: GraphicsInspection = {
  status: GraphicsTaskStatus.IDLE,
  data: {}
}

export const graphicsInspectionSlice = createSlice({
  name: 'graphicsInspection',
  initialState,
  reducers: {
    START_INSPECTION(state: GraphicsInspection) {
      state.status = GraphicsTaskStatus.EXECUTING
    },
    PAUSE_INSPECTION(state: GraphicsInspection) {
      state.status = GraphicsTaskStatus.PAUSED
    },
    FINISH_INSPECTION(state: GraphicsInspection) {
      state.status = GraphicsTaskStatus.IDLE
    }
  },
  selectors: {
    getInspectionStatusSelector: (state: GraphicsInspection) => {
      return state.status
    }
  }
})

export const graphicsInspectionActions = graphicsInspectionSlice.actions
export const graphicsInspectionSelectors = graphicsInspectionSlice.selectors
