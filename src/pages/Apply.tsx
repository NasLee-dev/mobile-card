import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/hooks/auth/usePollApplyStatus'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ApplyPage() {
  const navigate = useNavigate()
  const [readyToPoll, setReadyToPoll] = useState(false)
  const user = useUser()
  const { id } = useParams() as { id: string }
  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
      //  값이 추가되었을때 => 폴링 시작
    },
    onError: () => {
      //  실패했을 때 => 폴링 시작
      window.history.back()
    },
  })
  if (readyToPoll || 카드를신청중인가) {
    return <div>Loading</div>
  }
  return <Apply onSubmit={mutate} />
}
