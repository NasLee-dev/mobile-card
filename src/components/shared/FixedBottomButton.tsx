import { colors } from '@/styles/colorPalette'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'
import Button from './Button'

interface FixedButtomButtonProps {
  label: string
  onClick?: () => void
  disabled?: boolean
}

export default function FixedButtomButton({
  label,
  disabled,
  onClick,
}: FixedButtomButtonProps) {
  const $portalRoot = document.getElementById('root-portal')
  if ($portalRoot == null) {
    return null
  }
  return createPortal(
    <Container>
      <Button
        size="medium"
        full={true}
        onClick={onClick}
        css={buttonStyle}
        disabled={disabled}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideUp = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideUp} 0.5s ease-in-out forwards;
`

const buttonStyle = css`
  border-radius: 8px;
`
