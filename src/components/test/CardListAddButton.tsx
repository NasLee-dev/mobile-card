import Button from '../shared/Button'
import { card_list } from '../../mock/data'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'

function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    card_list.forEach((card: any) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))
      batch.set(docRef, card)
    })
    await batch.commit().then(() => {
      alert('카드 리스트를 추가했습니다.')
    })
  }
  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}

export default CardListAddButton
