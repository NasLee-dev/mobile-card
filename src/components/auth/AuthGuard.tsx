import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/remote/firebase'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  onAuthStateChanged(auth, (user) => {
    console.log('user', user)
    setInitialized(true)
  })
  if (!initialized) {
    return <div>인증 처리중...</div>
  }
  return <>{children}</>
}
