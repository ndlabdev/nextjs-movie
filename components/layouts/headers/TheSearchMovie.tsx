'use client'

// ** HeroUI Imports
import {Input} from '@heroui/react'

export default function TheSearchMovie() {
    return (
        <form className='flex max-w-xl flex-auto items-center rounded text max-md:hidden'>
            <Input placeholder='Search for movies, tv shows and people...' variant='flat' />
        </form>
    )
}
