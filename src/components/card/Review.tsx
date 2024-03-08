import { useInView } from 'react-intersection-observer'
import { useQuery } from 'react-query'
import Skeleton from '../shared/Skeleton'
import Spacing from '../shared/Spacing'

export default function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })
  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['너무 좋아요', '좋아요1', '좋아요2', '좋아요3', '좋아요4'])
        }, 2000)
      })
    },
    {
      enabled: inView,
    },
  )
  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skeleton width={30} heigth={10} />
          <Spacing size={10} />
          <Skeleton width={30} heigth={10} />
        </>
      ) : (
        data.map((review) => <div>{review}</div>)
      )}
    </div>
  )
}
