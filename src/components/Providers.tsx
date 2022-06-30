import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { darkTheme, lightTheme } from '../lib/theme';


export const Providers: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {

    return (
        <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
                light: lightTheme.className,
                dark: darkTheme.className
            }}
        >
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </NextThemesProvider>
    )
}