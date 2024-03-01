import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import TermsPage from '@/components/apply/Terms'
import { useState } from 'react'
import { ApplyValues } from '@/models/apply'
import Apply from '@/components/apply'

export default function ApplyPage() {
  const [step, setStep] = useState(0)
  const handleSubmit = () => {}
  return <Apply step={step} onSubmit={handleSubmit} />
}
