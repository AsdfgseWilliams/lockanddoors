import { Inter } from "next/font/google"
import Header from "@/app/components/layout/Header"
import Footer from "@/app/components/layout/Footer"
import { client } from "@/lib/graphql"
import { getMenu } from "@/lib/types/wp"
import { locales } from "@/lib/types/i18n"
import type { Locale } from "@/lib/types/i18n"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params  // ← await aquí, era el problema principal

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
  const menuItems = await getMenu("PRIMARY")

  return (
    <html lang={lang}>
      <body className={`${inter.variable} font-inter antialiased bg-background`}>
        <Header contacto={contacto} menuItems={menuItems} lang={lang} />
        <main className="pt-16">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  )
}