import { css } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
}

function ListRow({ left, contents, right, withArrow, onClick }: ListRowProps) {
  return (
    <Flex as="li" css={listRowContainerStyles} onClick={onClick} align="center">
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyles = css`
  margin-right: 14px;
`

const listRowContentsStyles = css`
  flex: 1;
`

function ListRowTexts({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subtitle}</Text>
    </Flex>
  )
}

ListRow.Texts = ListRowTexts

function IconArrowRight() {
  return (
    <svg
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      widths={20}
      height={20}
    >
      <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
    </svg>
  )
}

export default ListRow
