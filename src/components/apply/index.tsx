import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import TermsPage from '@/components/apply/Terms'
import { useEffect, useState } from 'react'
import { ApplyValues, APPLY_STATUS } from '@/models/apply'
import useUser from '@/hooks/auth/useUser'
import { useParams } from 'react-router-dom'
import ProgressBar from '../shared/ProgressBar'

export default function Apply({
  onSubmit,
}: {
  onSubmit: (values: ApplyValues) => void
}) {
  const user = useUser()
  const { id } = useParams() as { id: string }
  const storageKey = `applied-${user?.uid}-${id}`
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)
    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      }
    }
    return JSON.parse(applied)
  })
  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.REDAY,
      } as ApplyValues)
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms,
      step: (prev.step as number) + 1,
    }))
  }
  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...infoValues,
      step: (prev.step as number) + 1,
    }))
  }
  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...cardInfoValues,
      step: (prev.step as number) + 1,
    }))
  }
  return (
    <div>
      <ProgressBar progress={applyValues.step! / 3} />
      {applyValues.step === 0 ? <TermsPage onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  )
}
