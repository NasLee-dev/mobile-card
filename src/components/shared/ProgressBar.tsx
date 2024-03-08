import styled from '@emotion/styled'
import { colors } from '../../styles/colorPalette'

const BaseProgressBar = styled.div<{ progress: number }>(({ progress }) => ({
  height: 10,
  backgroundColor: colors.blue,
  transform: `scaleX(${progress})`,
  transition: `transform 0.3s ease`,
  transformOrigin: 'left',
}))

const Container = styled.div(() => ({
  width: '100%',
  height: 10,
  backgroundColor: colors.grey,
  overflow: 'hidden',
  borderRadius: 5,
}))

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <Container>
      <BaseProgressBar progress={progress} />
    </Container>
  )
}
