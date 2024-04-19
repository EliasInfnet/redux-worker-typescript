import { GraphicsTaskStatus } from '@renderer/enum/graphics'
import { GraphicsInspection } from '@renderer/types/graphics'

const firstInspection: GraphicsInspection = {
  id: 'd76556f1-0a8b-4bda-8541-7ab104b564cb',
  name: 'First Inspection',
  interval: null,
  step: null,
  status: GraphicsTaskStatus.IDLE,
  data: {}
}

const secondInspection: GraphicsInspection = {
  id: '1d5c0358-1809-420e-a130-93c35791034b',
  name: 'Second Inspection',
  interval: null,
  step: null,
  status: GraphicsTaskStatus.IDLE,
  data: {}
}

const thirdInspection: GraphicsInspection = {
  id: '85f20ff0-5b87-4ff5-99e9-20c92c0aeb53',
  name: 'Third Inspection',
  interval: null,
  step: null,
  status: GraphicsTaskStatus.IDLE,
  data: {}
}

export default {
  [firstInspection.id]: firstInspection,
  [secondInspection.id]: secondInspection,
  [thirdInspection.id]: thirdInspection
}
