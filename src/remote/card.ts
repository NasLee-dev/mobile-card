import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants'
import { Card } from '@/models/card'

async function getCards() {
  const cardSnapshot = await getDocs(collection(store, COLLECTIONS.CARD))
  console.log(cardSnapshot)
  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}

export { getCards }
