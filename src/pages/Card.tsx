import FixedButtomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { getCard } from '@/remote/card'
import { css } from '@emotion/react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CardPage() {
  const { id = '' } = useParams()
  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: !!id, // id가 있을 때만 실행
  })

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data
  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')
  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index: number) => {
          return (
            <motion.li
              key={text}
              initial={{ opacity: 0, translateX: -90 }}
              animate={{
                opacity: 1,
                translateX: 0,
                transition: {
                  duration: 1.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.1,
                },
              }}
            >
              <ListRow
                as="div"
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subtitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>
      {promotion != null ? (
        <Flex justify="center" direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}
      <FixedButtomButton label="신청하기" onClick={() => {}} />
    </div>
  )
}

function IconCheck() {
  return (
    <img
      src="/checkIcon.png"
      alt="check"
      style={{ width: '24px', height: '24px' }}
    />
  )
}

function removeHtmlTags(text: string) {
  let output = ''
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }
  return output
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`
