import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import TermsPage from '@/components/apply/Terms'
import { useState } from 'react'
import { ApplyValues } from '@/models/apply'

export default function Apply({
  step,
  onSubmit,
}: {
  step: number
  onSubmit: (values: ApplyValues) => void
}) {
  const handleTermsChange = (terms: ApplyValues['terms']) => {}
  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {}
  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    console.log(cardInfoValues)
  }
  return (
    <div>
      {step === 0 ? <TermsPage onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  )
}
