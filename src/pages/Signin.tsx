import Form from '@/components/signin/Form'
import { FormValues } from '@/models/signin'
import { useCallback } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import { useAlertContext } from '@/contexts/AlertContext'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'

export default function SigninPage() {
  const { open } = useAlertContext()!
  const navigate = useNavigate()
  const handleSubmit = useCallback(async (formValues: FormValues) => {
    try {
      const { email, password } = formValues
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response.user) {
        navigate('/')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/wrond-password') {
          open({
            title: '계정의 정보를 다시 확인해주세요.',
            onButtonClick: () => {},
          })
          return
        }
      } else {
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {},
        })
      }
    }
  }, [])
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
