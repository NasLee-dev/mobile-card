import { FormValues } from '@/models/signup'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import validator from 'validator'
import FixedButtomButton from '../shared/FixedBottomButton'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import TextField from '../shared/TextField'

export default function Form() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  const errors = useMemo(() => validate(formValues), [formValues])

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <Flex direction="column" css={formContainerStyles}>
      <Spacing size={16} />
      <TextField
        label="이메일"
        name="email"
        value={formValues.email}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="패스워스"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="패스워스 재확인"
        type="password"
        name="rePassword"
        value={formValues.rePassword}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        value={formValues.name}
        onChange={handleFormValues}
      />
      <FixedButtomButton label="회원가입" onClick={() => {}} disabled={true} />
    </Flex>
  )
}

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}
  if (validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.'
  }
  if (formValues.password !== formValues.rePassword) {
    errors.rePassword = '비밀번호가 일치하지 않습니다.'
  } else if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8자 이상이어야 합니다.'
  }
  if (!formValues.name) {
    errors.name = '이름을 입력해주세요.'
  } else if (formValues.name.length < 2) {
    errors.name = '이름은 2자 이상이어야 합니다.'
  }
}

const formContainerStyles = css`
  padding: 24px;
`
