import { ActionIcon, Group, Paper, Stack, Text } from '@mantine/core'
import { graphicsInspectionSelectors } from '@renderer/store/reducers/graphicsInspection'
import { IconPlayerPlay, IconPlayerStop } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import InspectionItem from './components/InspectionItem'

function Inspections(): JSX.Element {
  const inspections = useSelector(graphicsInspectionSelectors.getInspections)
  return (
    <Stack gap={'xs'}>
      {inspections.map((inspection) => (
        <InspectionItem key={inspection.id} inspection={inspection} />
      ))}
    </Stack>
  )
}

export default Inspections
