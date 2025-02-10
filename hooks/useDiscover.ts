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
import { IDiscoverMovie } from '@/types/discover'

const queryKey = {
    discoverTV: 'discover-tv',
    discoverMovie: 'discover-movie'
}

export const useDiscoverMovie = (type: 'movie' | 'tv') => {
    const searchParams = useSearchParams()
    const searchSort = searchParams.get('sort')

    const isMovie = type === 'movie'
    const key = isMovie ? queryKey.discoverMovie : queryKey.discoverTV
    const url = isMovie ? '/discover/movie' : '/discover/tv'

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery<IDiscoverMovie>({
        queryKey: [key, searchSort],
        queryFn: ({ pageParam }) => returnFetch(url, {
            params: {
                page: pageParam,
                sort_by: searchSort
            }
        })
            .then((response) => response.json()),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
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

    return {
        data: data?.pages.map((page) => ({
            ...page,
            results: page.results.map((result) => ({
                id: result.id,
                name: result.name || result.title,
                overview: result.overview,
                poster_path: result.poster_path,
                vote_average: result.vote_average
            }))
        })),
        isFetching,
        isFetchingNextPage,
        observerRef
    }
}
