export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        {/* Logo with elegant animation */}
        <div className="relative inline-block mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 animate-spin">
            <div className="h-24 w-24 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-400"></div>
          </div>
          
          {/* Inner pulsing ring */}
          <div className="absolute inset-2 animate-pulse">
            <div className="h-20 w-20 rounded-full border border-blue-200"></div>
          </div>
          
          {/* Logo container */}
          <div className="relative h-24 w-24 bg-white rounded-full shadow-lg flex items-center justify-center p-4">
            <img
              src="/batinologo.png"
              alt="Batino Group Logo"
              width={60}
              height={60}
              className="object-contain animate-pulse"
            />
          </div>
        </div>
        
        {/* Loading text with dots animation */}
        <div className="space-y-2">
          <p className="text-xl font-semibold text-gray-700">Batino Group</p>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-gray-600">Yüklənir</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
