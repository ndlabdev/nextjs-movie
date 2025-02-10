'use client'

// ** Next Imports
import { useSearchParams } from 'next/navigation'

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
    const searchParams = useSearchParams()
    const searchSort = searchParams.get('sort')

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery<ITVSeriesPopular>({
        queryKey: [queryKey.tvPopular, searchSort],
        queryFn: ({ pageParam }) => returnFetch('/discover/tv', {
            params: {
                page: pageParam,
                sort_by: searchSort
            }
        })
            .then((response) => response.json()),
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
