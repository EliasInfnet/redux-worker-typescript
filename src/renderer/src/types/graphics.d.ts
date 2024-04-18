import { GraphicsInspectionCriticality } from '@renderer/enum/graphics'

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
  status: GraphicsTaskStatus
  data: GraphicsInspectionData
}
