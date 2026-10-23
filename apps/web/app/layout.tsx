import { Geist_Mono, Nunito_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { cn } from "@workspace/ui/lib/utils"
import { connection } from "next/server"

const geistMonoHeading = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
})

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await connection()

  const config = {
    googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
    landingUrl: process.env.LANDING_URL ?? "/login",
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        nunitoSans.variable,
        geistMonoHeading.variable
      )}
    >
      <body>
        <Providers config={config}>{children}</Providers>
      </body>
    </html>
  )
}
