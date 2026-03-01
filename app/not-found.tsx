// app/not-found.tsx
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl">Página no encontrada</h2>
      <p className="text-gray-500">La página que buscas no existe o ha sido movida.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Volver al inicio
      </Link>
    </div>
  )
}