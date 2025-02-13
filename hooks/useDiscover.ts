'use client'

// ** Next Imports
import { useSearchParams, useParams } from 'next/navigation'

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
    const params = useParams()
    const searchParams = useSearchParams()
    const searchSort = searchParams.get('sort')

    const isMovie = type === 'movie'
    const key = isMovie ? queryKey.discoverMovie : queryKey.discoverTV
    const url = `/discover/${params.slug ?? (type === 'movie' ? 'movie' : 'tv')}`

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery<IDiscoverMovie>({
        queryKey: [key, searchSort, params],
        queryFn: ({ pageParam }) => returnFetch(url, {
            params: {
                page: pageParam,
                sort_by: searchSort,
                ...(params.id && { with_genres: params.id })
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
        data: (() => {
            const uniqueIds = new Set<number>()
        
            return data?.pages.map((page) => ({
                ...page,
                results: page.results
                    .filter((result) => {
                        if (uniqueIds.has(result.id)) return false
                        uniqueIds.add(result.id)

                        return true
                    })
                    .map((result) => ({
                        id: result.id,
                        name: result.name || result.title,
                        overview: result.overview,
                        poster_path: result.poster_path,
                        vote_average: result.vote_average
                    }))
            }))
        })(),
        isFetching,
        isFetchingNextPage,
        observerRef
    }
}
