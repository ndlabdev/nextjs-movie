'use client'

// ** React Imports
import { RefObject, useCallback, useEffect, useState } from 'react'

// ** HeroUI Imports
import { Button } from '@heroui/react'

// ** Icons Imports
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ** Interface
interface Props {
    carouselRef: RefObject<HTMLDivElement>
}

export default function BaseCarouselScroll({ carouselRef }: Props) {
    const [isAtStart, setIsAtStart] = useState<boolean>(true)
    const [isAtEnd, setIsAtEnd] = useState<boolean>(false)

    const checkScrollPosition = useCallback(() => {
        if (!carouselRef.current) return
    
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    
        setIsAtStart(scrollLeft <= 0)
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1)
    }, [])
    
    useEffect(() => {
        const carousel = carouselRef.current
    
        if (!carousel) return
    
        carousel.addEventListener('scroll', checkScrollPosition)
        checkScrollPosition()
    
        return () => carousel.removeEventListener('scroll', checkScrollPosition)
    }, [checkScrollPosition])

    const handleScroll = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return

        const { clientWidth } = carouselRef.current
        const scrollAmount = clientWidth * 0.8

        carouselRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        })
    }

    return (
        <div className="flex flex-shrink-0 items-center gap-1">
            <Button
                isIconOnly
                className={`text-white ${isAtStart ? 'opacity-disabled' : ''}`}
                disabled={isAtStart}
                startContent={<ChevronLeft />}
                variant='light'
                onPress={() => handleScroll('left')}
            />

            <Button
                isIconOnly
                className={`text-white ${isAtEnd ? 'opacity-disabled' : ''}`}
                disabled={isAtEnd}
                startContent={<ChevronRight />}
                variant='light'
                onPress={() => handleScroll('right')}
            />
        </div>
    )
}
