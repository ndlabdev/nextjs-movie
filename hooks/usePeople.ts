'use client'

// ** Next Imports
import { useParams } from 'next/navigation'

// ** Third Party Imports
import { useQuery } from '@tanstack/react-query'

// ** Lib Imports
import { returnFetch } from '@/lib/return-fetch'

// ** Types Imports
import { IPeople } from '@/types/people'

const queryKey = {
    peopleDetail: 'people-detail'
}

export const usePeopleDetail = () => {
    const params = useParams()

    return useQuery<IPeople>({
        queryKey: [queryKey.peopleDetail, params.id],
        queryFn: () => returnFetch(`/person/${params.id}`, {
            params: {
                append_to_response: 'movie_credits'
            }
        })
            .then((response) => response.json())
    })
}
