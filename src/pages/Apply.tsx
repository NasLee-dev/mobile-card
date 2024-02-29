import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import TermsPage from '@/components/apply/Terms'
import { useState } from 'react'

export default function ApplyPage() {
  const [step, setStep] = useState(0)
  const handleTermsChange = (values: string[]) => {
    console.log(values)
  }
  return (
    <div>
      {step === 0 ? <TermsPage onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo /> : null}
      {step === 2 ? <CardInfo /> : null}
    </div>
  )
}
