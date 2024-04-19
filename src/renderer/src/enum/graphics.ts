export enum GraphicsTaskStatus {
  IDLE = 'IDLE',
  ERROR = 'ERROR',
  CANCELED = 'CANCELED',
  EXECUTING = 'EXECUTING',
  FINISHED = 'FINISHED'
}

export enum GraphicsTaskSteps {
  FEATURE_MATCH = 'FEATURE_MATCH',
  THRESHOLD = 'THRESHOLD',
  SUBTRACTION = 'SUBTRACTION',
  MERGE_RECTS = 'MERGE_RECTS'
}

export enum GraphicsInspectionCriticality {
  IGNORE = 'IGNORE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}
