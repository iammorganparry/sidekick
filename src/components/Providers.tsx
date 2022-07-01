import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { darkTheme, lightTheme } from '../lib/theme';


export const Providers: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {

    return (
        <NextThemesProvider
            defaultTheme="system"
            attribute="data-color"
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