import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/hooks/auth/usePollApplyStatus'
import { useState } from 'react'

export default function ApplyPage() {
  const [readyToPoll, setReadyToPoll] = useState(false)
  usePollApplyStatus({
    onSuccess: () => {
      console.log('카드 발급 완료')
    },
    onError: () => {
      console.log('카드 발급 실패')
    },
    enabled: readyToPoll,
  })
  const { mutate } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
      //  값이 추가되었을때 => 폴링 시작
    },
    onError: () => {
      //  실패했을 때 => 폴링 시작
      window.history.back()
    },
  })
  return <Apply onSubmit={mutate} />
}
