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
    const currencyMap = {
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

export const showImage = (path: string, width = 300) => `${config.imageURL}/w${width}/${path}`
