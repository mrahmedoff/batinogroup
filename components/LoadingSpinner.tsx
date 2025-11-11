export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Logo with spinning border */}
        <div className="relative inline-block">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600 absolute inset-0"></div>
          <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center p-3">
            <img
              src="/batinologo.png"
              alt="Batino Group Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Yüklənir...</p>
      </div>
    </div>
  );
}
