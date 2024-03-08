import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/hooks/auth/usePollApplyStatus'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAppliedCard from '@/components/apply/hooks/useAppliedCard'
import { useAlertContext } from '@/contexts/AlertContext'
import FullpageLoader from '@/components/shared/FullpageLoader'

const STATUS_MESSAGE = {
  [APPLY_STATUS.REDAY]: '카드 심사를 준비하고 있습니다.',
  [APPLY_STATUS.PROGRESS]: '카드 심사 중입니다.',
  [APPLY_STATUS.COMPLETE]: '카드 발급이 완료되었습니다.',
}

export default function ApplyPage() {
  const navigate = useNavigate()
  const [readyToPoll, setReadyToPoll] = useState(false)
  const user = useUser()
  const { open } = useAlertContext()!
  const { id } = useParams() as { id: string }

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }
        if (applied.status === APPLY_STATUS.COMPLETE) {
          //  이미 발급이 완료된 요소라면
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
          return
        }
        setReadyToPoll(true) //  카드 신청 정보가 있으면서, 발급이 완료되지 않았다면 폴링 시작 => 카드 재심사 시작
      },
      onError: () => {},
      suspense: true,
    },
  })

  const { data: status } = usePollApplyStatus({
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
  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }
  if (readyToPoll || 카드를신청중인가) {
    return <FullpageLoader message={STATUS_MESSAGE[status ?? 'REDAY']} />
  }
  return <Apply onSubmit={mutate} />
}
