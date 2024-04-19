import { GraphicsInspectionCriticality, GraphicsTaskSteps } from '@renderer/enum/graphics'

type GraphicsInspectionDiff = {
  id: string
  status: GraphicsDiffCriticality
}

type GraphicsInspectionData = {
  status?: GraphicsInspectionCriticality
  originalBlob?: string
  sampleBlob?: string
  diffs?: { [key: string]: GraphicsInspectionDiff }
}

type GraphicsInspection = {
  id: string
  name: string
  interval: number | null
  status: GraphicsTaskStatus
  step: GraphicsTaskSteps | null
  data: GraphicsInspectionData
}

type GraphicsInspections = {
  [id: string]: GraphicsInspection
}
