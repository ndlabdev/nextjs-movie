// ** Components Imports
import BasePeopleRetrieveRetrieve from '@/components/pages/people/retrieve'

// ** Context Imports
import { PeopleRetrieveProvider } from '@/context/people/retrieve'

export default function PeopleDetail() {
    return (
        <PeopleRetrieveProvider>
            <BasePeopleRetrieveRetrieve />
        </PeopleRetrieveProvider>
    )
}
