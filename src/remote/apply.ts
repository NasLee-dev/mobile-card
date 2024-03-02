import { COLLECTIONS } from '@/constants'
import { ApplyValues } from '@/models/apply'
import { addDoc, collection } from 'firebase/firestore'
import { store } from './firebase'

export async function applyCard(applyValues: ApplyValues) {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues)
}

export function updateApplyCard() {}
