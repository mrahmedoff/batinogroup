'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">
              About Us — Batino Group LLC
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Founded in 2023, Batinogroup LLC is a dynamic engineering and industrial services company
              dedicated to enhancing the performance, reliability, and efficiency of critical assets across various sectors.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2023</div>
              <div className="text-gray-600">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">8+</div>
              <div className="text-gray-600">Service Areas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Quality Focus</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>

          {/* Company Description Section */}
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Company</h2>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                  We provide comprehensive solutions that support the sustainable operation of industrial facilities,
                  combining technical excellence with a strong commitment to quality and customer satisfaction.
                </p>

                <p>
                  At Batinogroup, we specialize in a wide range of services, including:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Industrial Consulting & Equipment Supply</h3>
                    <p className="text-gray-700">
                      We provide expert guidance in selecting high-quality equipment and spare parts that meet international standards.
                      Our supply services ensure reliable, cost-effective, and tailored solutions for diverse industrial needs.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Commissioning, Start-Up & Preventive Maintenance</h3>
                    <p className="text-gray-700">
                      Our experienced engineers carry out commissioning and start-up operations, while also offering structured
                      preventive maintenance programs designed to reduce downtime and extend equipment lifespan.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Diagnostics, Condition Monitoring & Technical Maintenance</h3>
                    <p className="text-gray-700">
                      Using advanced diagnostic tools—including vibration analysis, alignment, and balancing—we identify issues early
                      and optimize equipment performance. Our monitoring systems enable continuous tracking of asset condition for timely decision-making.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">CAD Engineering & 3D Design Services</h3>
                    <p className="text-gray-700">
                      We offer professional CAD modeling, technical drawings, and 3D design solutions for industrial components,
                      assemblies, and facility layouts. Our engineering team develops accurate and efficient designs that support
                      manufacturing, installation, and project planning processes.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Unscheduled Projects & Equipment Overhaul</h3>
                    <p className="text-gray-700">
                      We handle urgent repair tasks, unexpected failures, and complex technical challenges with agility and precision,
                      minimizing operational interruptions and restoring assets to optimal working condition.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Installation of Monitoring & Tracking Systems</h3>
                    <p className="text-gray-700">
                      From periodic measurement solutions to complete online condition monitoring platforms, we install and integrate
                      systems that enhance reliability, transparency, and long-term operational control.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6 md:col-span-2">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Engineering, Design & Industrial Plant Installation</h3>
                    <p className="text-gray-700">
                      Batinogroup delivers end-to-end engineering services—from conceptual design to installation of industrial
                      and mining facilities—ensuring that each project meets the highest safety and performance standards.
                    </p>
                  </div>
                </div>

                <p className="text-lg font-medium text-blue-900 text-center mt-8">
                  Driven by innovation, professionalism, and a customer-centric approach, Batinogroup LLC aims to become a trusted
                  partner in the region's industrial development. Our highly skilled team is committed to continuous improvement,
                  operational excellence, and delivering value-driven solutions that empower our clients to achieve sustainable growth.
                </p>
              </div>
            </div>
          </div>


        </div>
      </main>
      <Footer />
    </div>
  );
}