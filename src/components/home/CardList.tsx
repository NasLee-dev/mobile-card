import { getCards } from '@/remote/card'
import { useInfiniteQuery, useQuery } from 'react-query'
import ListRow from '../shared/ListRow'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      console.log(pageParam)
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
    },
  )

  const cards = flatten(data?.pages.map(({ items }) => items))

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])
  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
        {cards?.map((card, index) => {
          return (
            <ListRow
              contents={
                <ListRow.Texts title={`${index + 1}위`} subtitle={card.name} />
              }
              right={card.payback !== null ? <div>{card.payback}</div> : null}
              withArrow={true}
              key={card.id}
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}

export default CardList
