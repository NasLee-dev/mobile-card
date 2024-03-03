import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atom/user'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  const setUser = useSetRecoilState(userAtom)
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    } else {
      setUser(null)
    }
    setInitialized(true)
  })

  if (!initialized) {
    return null
  }
  return <>{children}</>
}
