import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants'
import { AdBanner } from '@/models/card'

async function getAdBanners() {
  const adBannerSnapshot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  )
  console.log(adBannerSnapshot)
  return adBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}

export { getAdBanners }
