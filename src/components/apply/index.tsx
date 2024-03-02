import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import TermsPage from '@/components/apply/Terms'
import { useEffect, useState } from 'react'
import { ApplyValues, APPLY_STATUS } from '@/models/apply'
import useUser from '@/hooks/auth/useUser'
import { useParams } from 'react-router-dom'

export default function Apply({
  onSubmit,
}: {
  onSubmit: (values: ApplyValues) => void
}) {
  const [step, setStep] = useState(0)
  const user = useUser()
  const { id } = useParams() as { id: string }
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })
  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.REDAY,
      } as ApplyValues)
    }
  }, [step, applyValues, onSubmit])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({ ...prev, terms }))
    setStep((prev) => prev + 1)
  }
  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {
    setApplyValues((prev) => ({ ...prev, ...infoValues }))
    setStep((prev) => prev + 1)
  }
  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prev) => ({ ...prev, ...cardInfoValues }))
    setStep((prev) => prev + 1)
  }
  return (
    <div>
      {step === 0 ? <TermsPage onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  )
}
