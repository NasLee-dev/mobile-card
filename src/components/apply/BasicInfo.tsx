import Select from '../shared/Select'
import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@/constants/apply'
import { ChangeEvent, useCallback, useState } from 'react'
import { ApplyValues } from '@/models/apply'
import FixedButtomButton from '../shared/FixedBottomButton'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

export default function BasicInfo({
  onNext,
}: {
  onNext: (InfoValues: InfoValues) => void
}) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setInfoValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])
  const 모든정보가선택되었는가 = Object.values(infoValues).every(
    (v) => v !== '',
  )
  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />
      <FixedButtomButton
        label="다음"
        onClick={() => onNext(infoValues)}
        disabled={모든정보가선택되었는가 === false}
      />
    </div>
  )
}
