// ** Configs Imports
import config from '@/config'

// ** Types
interface FetchOptions extends RequestInit {
    params?: Record<string, string | number | string[] | undefined>
}

function getBearerTokenFromCookie(nameToken = 'accessToken') {
    if (typeof document !== 'undefined') {
        const cookies = document.cookie.split('; ');
        const tokenCookie = cookies.find((cookie) => cookie.startsWith(`${nameToken}=`));

        return tokenCookie ? tokenCookie.split('=')[1] : null;
    }

    return null;
}

function removeCookie(name: string) {
    if (typeof document !== 'undefined') {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

function redirectToHome() {
    if (typeof window !== 'undefined') {
        window.location.href = '/';
    }
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
        const response = await fetch(url.toString(), {
            ...opt,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
            }
        })

        if (!response.ok) {}

        return response
    } catch (err) {
        throw err
    }
}
