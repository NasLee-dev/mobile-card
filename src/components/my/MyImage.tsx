/* eslint-disable jsx-a11y/img-redundant-alt */
import useUser from '@/hooks/auth/useUser'
import { app, storage, store } from '@/remote/firebase'
import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { ChangeEvent } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atom/user'

export default function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) {
  const setUser = useSetRecoilState(userAtom)
  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const currentUser = getAuth(app).currentUser
    if (files == null || user == null || currentUser == null) {
      return
    }

    const fileName = files[0].name
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)
    const uploaded = await uploadBytes(storageRef, files[0])
    const downloadURL = await getDownloadURL(uploaded.ref)
    await updateProfile(currentUser, {
      photoURL: downloadURL,
    })
    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadURL,
    })
    setUser({
      //  화면에 갱신해주기 위해
      ...user,
      photoURL: downloadURL,
    })
  }
  const user = useUser()
  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        alt="my image"
        width={size}
        height={size}
      />
      {mode === 'upload' ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`
