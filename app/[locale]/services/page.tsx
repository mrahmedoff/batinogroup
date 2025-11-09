import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive construction, oil & gas, and energy solutions tailored to meet 
              your industrial and infrastructure needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Construction Services</h3>
              <p className="text-gray-600 mb-4">
                Full-scale construction solutions from design to completion.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Civil Construction</li>
                <li>• Industrial Construction</li>
                <li>• Infrastructure Development</li>
                <li>• Project Management</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Oil & Gas Solutions</h3>
              <p className="text-gray-600 mb-4">
                Specialized services for upstream and downstream operations.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Upstream Services</li>
                <li>• Downstream Operations</li>
                <li>• Pipeline Construction</li>
                <li>• Refinery Services</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Energy & Utilities</h3>
              <p className="text-gray-600 mb-4">
                Advanced energy solutions and utility infrastructure.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Power Generation</li>
                <li>• Renewable Energy</li>
                <li>• Electrical Systems</li>
                <li>• Grid Infrastructure</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}