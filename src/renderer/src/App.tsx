import { Center, Container } from '@mantine/core'
import Inspections from './pages/inspections/Inspections'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  return (
    <Container h={'100vh'}>
      <Center h={'100%'}>
        <Inspections />
      </Center>
    </Container>
  )
}

export default App
