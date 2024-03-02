import FixedButtomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { parse } from 'qs'

export default function ApplyDone() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <Flex>
      <Text>
        {success === 'true'
          ? '카드가 발급되었습니다.'
          : '카드 발급에 실패하였습니다.'}
      </Text>
      <FixedButtomButton
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}
