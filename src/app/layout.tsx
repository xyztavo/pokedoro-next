import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner"
const press_start = Press_Start_2P({ weight: "400", subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Pokedoro NEXT",
  description: "Pokemons + pomodoro timer.",
};


export default function RootLayout({ children }: any) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>

        <head />
        <body className={press_start.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Toaster />
            </ThemeProvider>
        </body>
      </html >
    </>
  )
}
