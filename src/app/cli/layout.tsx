import type React from "react"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
