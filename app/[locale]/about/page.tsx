import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              About BatinoGroup
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about our company, values, leadership team, and commitment to excellence 
              in construction and industrial services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Company Overview</h3>
              <p className="text-gray-600 mb-4">
                Discover our story, mission, vision, and the values that drive our success.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Our Story</li>
                <li>• Mission & Vision</li>
                <li>• Company Values</li>
                <li>• Leadership Team</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality & Standards</h3>
              <p className="text-gray-600 mb-4">
                Our commitment to quality management and industry standards.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Quality Management</li>
                <li>• ISO Certifications</li>
                <li>• Safety Standards</li>
                <li>• Environmental Policy</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partnerships</h3>
              <p className="text-gray-600 mb-4">
                Our strategic partnerships and global network of clients and suppliers.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Strategic Partners</li>
                <li>• Global Clients</li>
                <li>• Supplier Network</li>
                <li>• Joint Ventures</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}