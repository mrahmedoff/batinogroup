'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getAboutImages, AboutImages } from '@/lib/aboutImages';

export default function AboutPage() {
  const [images, setImages] = useState<AboutImages>({
    au1: '/au1.jpg',
    au2: '/au2.jpg',
    au3: '/au3.jpg'
  });

  useEffect(() => {
    const loadImages = async () => {
      const aboutImages = await getAboutImages();
      setImages(aboutImages);
    };
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Founded in 2023, Batinogroup LLC is a dynamic engineering and industrial services company
              dedicated to enhancing the performance, reliability, and efficiency of critical assets across various sectors.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Company Description */}
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We provide comprehensive solutions that support the sustainable operation of industrial facilities,
                combining technical excellence with a strong commitment to quality and customer satisfaction.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Batinogroup, we specialize in a wide range of services, including:
              </p>
            </div>
          </div>

          {/* Images Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={images.au1}
                alt="Industrial Services"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={images.au2}
                alt="Engineering Excellence"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={images.au3}
                alt="Technical Solutions"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Services Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Industrial Consulting & Equipment Supply</h3>
              <p className="text-gray-700 leading-relaxed">
                We provide expert guidance in selecting high-quality equipment and spare parts that meet international standards. 
                Our supply services ensure reliable, cost-effective, and tailored solutions for diverse industrial needs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Commissioning, Start-Up & Preventive Maintenance</h3>
              <p className="text-gray-700 leading-relaxed">
                Our experienced engineers carry out commissioning and start-up operations, while also offering structured 
                preventive maintenance programs designed to reduce downtime and extend equipment lifespan.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Diagnostics, Condition Monitoring & Technical Maintenance</h3>
              <p className="text-gray-700 leading-relaxed">
                Using advanced diagnostic tools—including vibration analysis, alignment, and balancing—we identify issues early 
                and optimize equipment performance. Our monitoring systems enable continuous tracking of asset condition for timely decision-making.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-blue-900 mb-4">CAD Engineering & 3D Design Services</h3>
              <p className="text-gray-700 leading-relaxed">
                We offer professional CAD modeling, technical drawings, and 3D design solutions for industrial components, 
                assemblies, and facility layouts. Our engineering team develops accurate and efficient designs that support 
                manufacturing, installation, and project planning processes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Unscheduled Projects & Equipment Overhaul</h3>
              <p className="text-gray-700 leading-relaxed">
                We handle urgent repair tasks, unexpected failures, and complex technical challenges with agility and precision, 
                minimizing operational interruptions and restoring assets to optimal working condition.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Installation of Monitoring & Tracking Systems</h3>
              <p className="text-gray-700 leading-relaxed">
                From periodic measurement solutions to complete online condition monitoring platforms, we install and integrate 
                systems that enhance reliability, transparency, and long-term operational control.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-3">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Engineering, Design & Industrial Plant Installation</h3>
              <p className="text-gray-700 leading-relaxed">
                Batinogroup delivers end-to-end engineering services—from conceptual design to installation of industrial 
                and mining facilities—ensuring that each project meets the highest safety and performance standards.
              </p>
            </div>

          </div>

          {/* Conclusion */}
          <div className="bg-blue-900 rounded-2xl p-12 text-white text-center">
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              Driven by innovation, professionalism, and a customer-centric approach, Batinogroup LLC aims to become a trusted 
              partner in the region's industrial development. Our highly skilled team is committed to continuous improvement, 
              operational excellence, and delivering value-driven solutions that empower our clients to achieve sustainable growth.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}