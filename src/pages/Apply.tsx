import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import TermsPage from '@/components/apply/Terms'
import { useState } from 'react'
import { ApplyValues } from '@/models/apply'

export default function ApplyPage() {
  const [step, setStep] = useState(0)
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setStep(step + 1)
  }
  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {}
  return (
    <div>
      {step === 0 ? <TermsPage onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo /> : null}
    </div>
  )
}
