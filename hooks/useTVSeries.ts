// ** Third Party Imports
import { useInfiniteQuery } from '@tanstack/react-query'

// ** React Imports
import { useEffect, useRef } from 'react'

// ** Lib Imports
import { returnFetch } from '@/lib/return-fetch'

// ** Types Imports
import { ITVSeriesPopular } from '@/types/tv-series'

const queryKey = {
    tvPopular: 'tv-popular'
}

export const useTVSeriesPopular = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery<ITVSeriesPopular>({
        queryKey: [queryKey.tvPopular],
        queryFn: ({ pageParam }) => returnFetch('/tv/popular', {
            params: {
                page: pageParam
            }
        }).then((response) => response.json()),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
        }
    })

    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!observerRef.current || !hasNextPage) return
    
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage()
                }
            },
            { threshold: 1.0 }
        )
    
        const currentRef = observerRef.current

        observer.observe(currentRef)
    
        return () => {
            observer.unobserve(currentRef)
        }
    }, [fetchNextPage, hasNextPage])

    return { data, isFetchingNextPage, observerRef }
}
