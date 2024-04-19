import { ActionIcon, Grid, Group, Paper, Text } from '@mantine/core'
import { GraphicsTaskStatus } from '@renderer/enum/graphics'
import { runInspection } from '@renderer/store/actions/graphicsInspection'
import {
  graphicsInspectionActions,
  graphicsInspectionSelectors
} from '@renderer/store/reducers/graphicsInspection'
import { GraphicsInspection } from '@renderer/types/graphics'
import { IconPlayerPlay, IconPlayerStop, IconX } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

interface InspectionItemProps {
  inspection: GraphicsInspection
}

function InspectionItem({ inspection }: InspectionItemProps): JSX.Element {
  const dispatch = useDispatch()

  const graphicsInspectionStatus = useSelector((state: any) =>
    graphicsInspectionSelectors.getInspectionStatusSelector(state, inspection.id)
  )

  const graphicsInspectionStep = useSelector((state: any) =>
    graphicsInspectionSelectors.getInspectionStepSelector(state, inspection.id)
  )

  const isCanceled = graphicsInspectionStatus === GraphicsTaskStatus.CANCELED
  const isError = graphicsInspectionStatus === GraphicsTaskStatus.ERROR

  return (
    <Paper bg={'dark.6'} p={'md'} miw={400}>
      <Group justify='space-between'>
        <Text>{inspection.name}</Text>
        <Group gap={'xs'} justify="end">
          {inspection.interval && <Text size="xs">{inspection.interval / 1000} ms</Text>}
          <ActionIcon
            onClick={() => dispatch<any>(runInspection(inspection.id))}
            color={isCanceled || isError ? 'red' : 'lime'}
            size={'lg'}
            loading={graphicsInspectionStatus === GraphicsTaskStatus.EXECUTING}
          >
            {isCanceled || isError ? <IconX /> : <IconPlayerPlay />}
          </ActionIcon>
          <ActionIcon
            color="red"
            size={'lg'}
            onClick={() =>
              dispatch<any>(
                graphicsInspectionActions.SET_INSPECTION_STATUS({
                  id: inspection.id,
                  status: GraphicsTaskStatus.CANCELED
                })
              )
            }
          >
            <IconPlayerStop />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  )
}

export default InspectionItem
