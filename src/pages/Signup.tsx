import Form from '@/components/signup/Form'
import { COLLECTIONS } from '@/constants'
import { FormValues } from '@/models/signup'
import { auth, store } from '@/remote/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'

export default function SignupPage() {
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await updateProfile(user, {
        displayName: name,
      })
      const newUser = {
        uid: user.uid,
        email: user.email,
        name,
      }
      await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
