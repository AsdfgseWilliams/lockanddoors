// layout.tsx
import { Inter } from "next/font/google";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { client } from "@/lib/graphql";
import { getMenu } from "@/lib/wp";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Ajustamos la query a los campos ACF
  const query = `
  query HeaderOptions {
    page(id: 17, idType: DATABASE_ID) {
      paGinaDeOpciones {
        telefono
        email
      }
    }
  }
`;

const data = await client.request(query);
const contacto = data.page.paGinaDeOpciones;
const menuItems = await getMenu("PRIMARY");


  return (
    <html lang="es">
      <body className={`${inter.variable} font-inter antialiased bg-background`}>
        <Header contacto={contacto} menuItems={menuItems} />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
