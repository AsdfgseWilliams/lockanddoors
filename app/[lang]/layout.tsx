import { Inter } from "next/font/google"
import Header from "@/app/components/layout/Header"
import Footer from "@/app/components/layout/Footer"
import { client } from "@/lib/graphql"
import { getMenu } from "@/lib/types/wp"
import { locales } from "@/lib/types/i18n"
import type { Locale } from "@/lib/types/i18n"
import "@/app/globals.css"
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = (langParam as Locale)

  const query = `
    query HeaderOptions {
      page(id: 17, idType: DATABASE_ID) {
        paGinaDeOpciones {
          telefono
          email
        }
      }
    }
  `
  const data = await client.request(query)
  const contacto = data.page.paGinaDeOpciones
  const menuItems = await getMenu(lang)

  return (
    <html lang={lang}>
      <body className={`${inter.variable} font-inter antialiased bg-background`}>
        <Header contacto={contacto} menuItems={menuItems} lang={lang} />
        <main className="pt-16">{children}</main>
        <Footer lang={lang} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}