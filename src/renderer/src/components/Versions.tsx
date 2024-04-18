import { Button, Group, Stack, Text } from '@mantine/core'
import { GraphicsTaskStatus } from '@renderer/enum/graphics'
import { runInspection } from '@renderer/store/actions/graphicsInspection'
import { graphicsInspectionSelectors } from '@renderer/store/reducers/graphicsInspection'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

function Versions(): JSX.Element {
  const dispatch = useDispatch()

  const graphicsInspectionStatus = useSelector(
    graphicsInspectionSelectors.getInspectionStatusSelector
  )

  const graphicsInspectionButtonStatus = {
    [GraphicsTaskStatus.EXECUTING]: {
      color: 'yellow',
      text: 'Executando'
    },
    [GraphicsTaskStatus.IDLE]: {
      color: 'lime',
      text: 'Pronto'
    },
    [GraphicsTaskStatus.PAUSED]: {
      color: 'red',
      text: 'Pausado'
    }
  }[graphicsInspectionStatus]

  return (
    <Stack mt={100} justify='center'>
      <Group >
        <Button
          onClick={() => dispatch<any>(runInspection())}
          color={graphicsInspectionButtonStatus.color}
        >
          {graphicsInspectionButtonStatus.text}
        </Button>
      </Group>
    </Stack>
  )
}

export default Versions
