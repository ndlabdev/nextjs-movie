'use client'

// ** Next Imports
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes'

// ** React Imports
import * as React from 'react'

// ** HeroUI Imports
import { HeroUIProvider } from '@heroui/system'

// ** Third Party Imports
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './get-query-client'

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

declare module '@react-types/shared' {
    interface RouterConfig {
        routerOptions: NonNullable<
            Parameters<ReturnType<typeof useRouter>['push']>[1]
        >;
    }
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter()
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider navigate={router.push}>
                <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
            </HeroUIProvider>
        </QueryClientProvider>
    )
}
