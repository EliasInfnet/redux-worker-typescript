import {
  ActionIcon,
  ActionIconGroup,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core'
import { GraphicsTaskSteps } from '@renderer/enum/graphics'
import { runInspection } from '@renderer/store/actions/graphicsInspection'
import {
  graphicsInspectionActions,
  graphicsInspectionSelectors
} from '@renderer/store/reducers/graphicsInspection'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { IconPlayerPlay, IconPlayerStop } from '@tabler/icons-react'
function Versions(): JSX.Element {
  const dispatch = useDispatch()

  const graphicsInspectionStep = useSelector(graphicsInspectionSelectors.getInspectionStepSelector)

  const theme = useMantineTheme()
  const { dark } = theme.colors

  const graphicsInspectionButtonStatus = {
    [GraphicsTaskSteps.START]: {
      color: 'lime',
      text: 'Iniciate',
      value: 0
    },
    [GraphicsTaskSteps.ERROR]: {
      color: 'red',
      text: 'Error',
      value: 0
    },
    [GraphicsTaskSteps.FEATURE_MATCH]: {
      color: 'yellow',
      text: 'Feature Matching',
      value: 30
    },
    [GraphicsTaskSteps.THRESHOLD]: {
      color: 'yellow',
      text: 'Threshold',
      value: 60
    },
    [GraphicsTaskSteps.SUBTRACTION]: {
      color: 'yellow',
      text: 'Subtraction',
      value: 80
    },
    [GraphicsTaskSteps.MERGE_RECTS]: {
      color: 'blue',
      text: 'Merge Rects',
      value: 100
    }
  }[graphicsInspectionStep]

  return (
    <Stack mt={100} justify="center">
      <Stack>
        <Button
          onClick={() => dispatch<any>(runInspection())}
          color={graphicsInspectionButtonStatus.color}
          leftSection={
            <CircularProgressbar
              background
              strokeWidth={50}
              styles={{
                path: { backgroundColor: 'orange' },
                ...buildStyles({
                  pathColor: 'orange',
                  strokeLinecap: 'butt',
                  trailColor: dark[6]
                }),
                root: { width: 20 }
              }}
              value={graphicsInspectionButtonStatus.value}
            />
          }
        >
          {graphicsInspectionButtonStatus.text}
        </Button>
        <Button
          color="orange"
          onClick={() => dispatch(graphicsInspectionActions.PAUSE_INSPECTION())}
        >
          Pause
        </Button>
      </Stack>
      <Paper color="dark.5">
        <Group>
          <Text>
            Inspection <b>#1</b>
          </Text>
          <ActionIconGroup>
            <ActionIcon
              color="red"
              onClick={() => dispatch(graphicsInspectionActions.PAUSE_INSPECTION())}
              size={'md'}
            >
              <IconPlayerStop />
            </ActionIcon>
            <ActionIcon color="dark" onClick={() => dispatch<any>(runInspection())}>
              {graphicsInspectionStep !== GraphicsTaskSteps.START ? (
                <CircularProgressbar
                  background
                  strokeWidth={50}
                  styles={{
                    path: { backgroundColor: 'orange' },
                    ...buildStyles({
                      pathColor: 'orange',
                      strokeLinecap: 'butt',
                      trailColor: dark[6]
                    }),
                    root: { width: 20 }
                  }}
                  value={graphicsInspectionButtonStatus.value}
                />
              ) : (
                <IconPlayerPlay />
              )}
            </ActionIcon>
          </ActionIconGroup>
        </Group>
      </Paper>
    </Stack>
  )
}

export default Versions
