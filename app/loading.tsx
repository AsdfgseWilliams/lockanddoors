// app/loading.tsx (opcional)
// Next.js mostrará este componente mientras se cargan los datos

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative h-screen flex items-center justify-center bg-gray-200 animate-pulse">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="h-16 bg-gray-300 rounded-lg mb-6 max-w-2xl mx-auto" />
          <div className="h-8 bg-gray-300 rounded-lg mb-8 max-w-xl mx-auto" />
          <div className="flex gap-4 justify-center">
            <div className="h-14 w-40 bg-gray-300 rounded-lg" />
            <div className="h-14 w-40 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Servicios Skeleton */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-300 rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-gray-300 rounded-lg max-w-lg mx-auto animate-pulse" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-gray-300 rounded-lg mb-6 animate-pulse" />
                <div className="h-8 bg-gray-300 rounded-lg mb-3 animate-pulse" />
                <div className="h-20 bg-gray-300 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonios Skeleton */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-12 bg-gray-300 rounded-lg mb-16 max-w-md mx-auto animate-pulse" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-300 mr-4 animate-pulse" />
                  <div className="h-6 bg-gray-300 rounded-lg w-32 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Skeleton */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-12 bg-gray-300 rounded-lg mb-16 max-w-md mx-auto animate-pulse" />
          
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-6 bg-gray-300 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}