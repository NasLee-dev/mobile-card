import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atom/user'

export default function useUser() {
  return useRecoilValue(userAtom)
}
