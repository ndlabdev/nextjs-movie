// ** Configs Imports
import config from '@/configs/index'

// ** Types
interface FetchOptions extends RequestInit {
    params?: Record<string, string | number | string[] | undefined>
}

export async function returnFetch(path: RequestInfo | URL, opt?: FetchOptions) {
    const url = new URL(`${config.baseURL}${path}?language=en-US`)
    
    if (opt?.params) {
        Object.entries(opt.params).forEach(([key, value]) => {
            if (value !== null) {
                url.searchParams.append(key, String(value))
            }
        })
    }

    try {
        return await fetch(url.toString(), {
            ...opt,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${config.tmdbToken}`
            }
        })
    } catch (err) {
        throw err
    }
}
