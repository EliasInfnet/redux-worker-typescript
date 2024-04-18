import { configureStore } from '@reduxjs/toolkit'
import { graphicsInspectionSlice } from './reducers/graphicsInspection'

export const store = configureStore({
  reducer: {
    graphicsInspection: graphicsInspectionSlice.reducer
  }
})
