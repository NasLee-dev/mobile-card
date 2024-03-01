import Agreement from '../shared/Agreement'
import { 약관목록 } from '@/constants/apply'
import { MouseEvent, useCallback, useState } from 'react'
import FixedButtomButton from '../shared/FixedBottomButton'
import { ApplyValues } from '@/models/apply'

export default function TermsPage({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void
}) {
  const [termsAgreements, setTermsAgreement] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })
  const allChecked = Object.values(termsAgreements).every((v) => v)
  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreement((prev) =>
        Object.keys(prev).reduce<Record<string, boolean>>((acc, key) => {
          acc[key] = checked
          return acc
        }, {}),
      )
    },
    [],
  )
  return (
    <div>
      <Agreement>
        <Agreement.Title checked={allChecked} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={String(id)}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreement((prev) => ({
                ...prev,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedButtomButton
        label="약관동의"
        disabled={allChecked === false}
        onClick={() => {
          onNext(
            Object.keys(termsAgreements).filter((key) => termsAgreements[key]),
          )
        }}
      ></FixedButtomButton>
    </div>
  )
}
