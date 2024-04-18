export enum InspectionWorkerStatus {
  SUCCESS = 'SUCCESS',
  PROCEED = 'PROCEED',
  ERROR = 'ERROR'
}

export type InspectionWorkerOutput = {
  status: InspectionWorkerStatus
  data: unknown
}
