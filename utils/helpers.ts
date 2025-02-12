// ** Configs Imports
import config from '@/configs/index'

export const formattedDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date))
}

export const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60

    return `${hrs > 0 ? `${hrs}hr ` : ''}${mins > 0 ? `${mins}min` : ''}`.trim()
}

export const formatCurrency = (value: number, country = 'US') => {
    const currencyMap: Record<string, string> = {
        US: 'USD',
        CA: 'CAD',
        GB: 'GBP',
        EU: 'EUR',
        JP: 'JPY',
        IN: 'INR',
        AU: 'AUD',
        CN: 'CNY',
        KR: 'KRW'
    }

    const currency = currencyMap[country] || 'USD'

    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
}

export const showImage = (path: string, width = 500) => `${config.imageURL}/w${width}/${path}`
export const showImageOriginal = (path: string) => `${config.imageURL}/original/${path}`

export const getYear = (dateString: string): number => {
    return new Date(dateString).getFullYear()
}

export const getGender = (value: number): string => {
    const genders: Record<number, string> = {
        0: 'Not set / not specified',
        1: 'Female',
        2: 'Male',
        3: 'Non-binary'
    }

    return genders[value] || 'Unknown'
}

export const getMediaType = (value: string, known_for?: string): string => {
    const media_type: Record<string, string> = {
        'movie': 'Movie',
        'tv': 'TV Series'
    }

    return media_type[value] || known_for || 'Unknown'
}
