'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { Briefcase, MapPin, Clock, Send, DollarSign, X, Upload, CheckCircle, FileText, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { uploadCV } from '@/lib/uploadCV';

export default function CareerPage() {
  const { t } = useLanguage();
  const { jobs, addMessage } = useData();
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // Filter only published jobs
  const publishedJobs = jobs.filter(job => job.published);

  // Auto-select first job if available
  useEffect(() => {
    if (publishedJobs.length > 0 && !selectedJob) {
      setSelectedJob(publishedJobs[0]);
    }
  }, [publishedJobs, selectedJob]);

  return (
    <>
      <Header />
      <div className="pt-20">
      {/* Hero Section with Image */}
      <section className="relative h-[500px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/90 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)'
          }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.career}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {t.careerHeroDesc}
          </p>
        </div>
      </section>

      {/* Why Join Us with Images */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.whyJoinUs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1552581234-26160f608093?w=600&q=80)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">{t.careerDevelopment}</h3>
                <p className="text-gray-600">
                  {t.careerDevelopmentDesc}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">{t.flexibleSchedule}</h3>
                <p className="text-gray-600">
                  {t.flexibleScheduleDesc}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">{t.modernOffice}</h3>
                <p className="text-gray-600">
                  {t.modernOfficeDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">
            {t.openPositions} 
            {publishedJobs.length > 0 && (
              <span className="text-blue-600 ml-2">({publishedJobs.length})</span>
            )}
          </h2>
          
          {publishedJobs.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-lg text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hal-hazırda açıq vakansiya yoxdur</h3>
              <p className="text-gray-600">Yeni vakansiyalar haqqında məlumat almaq üçün bizimlə əlaqə saxlayın.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-4">
                {publishedJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition-all ${
                      selectedJob?.id === job.id ? 'ring-2 ring-blue-600' : ''
                    }`}
                  >
                    <h3 className="text-lg font-bold mb-2">{job.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-2">
                {selectedJob ? (
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">{selectedJob.title}</h2>
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {selectedJob.department}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {selectedJob.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {selectedJob.type}
                      </span>
                      {selectedJob.salary && (
                        <span className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          {selectedJob.salary}
                        </span>
                      )}
                    </div>

                    <div className="mb-6">
                      <h3 className="font-bold mb-3">{t.jobDescription}</h3>
                      <p className="text-gray-600 whitespace-pre-wrap">{selectedJob.description}</p>
                    </div>

                    {selectedJob.requirements && selectedJob.requirements.length > 0 && selectedJob.requirements[0] !== '' && (
                      <div className="mb-6">
                        <h3 className="font-bold mb-3">{t.requirements}</h3>
                        <ul className="space-y-2">
                          {selectedJob.requirements.map((req: string, index: number) => (
                            req && (
                              <li key={index} className="flex items-start gap-2 text-gray-600">
                                <span className="text-blue-600 mt-1">•</span>
                                {req}
                              </li>
                            )
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && selectedJob.responsibilities[0] !== '' && (
                      <div className="mb-8">
                        <h3 className="font-bold mb-3">Vəzifə Öhdəlikləri</h3>
                        <ul className="space-y-2">
                          {selectedJob.responsibilities.map((resp: string, index: number) => (
                            resp && (
                              <li key={index} className="flex items-start gap-2 text-gray-600">
                                <span className="text-blue-600 mt-1">•</span>
                                {resp}
                              </li>
                            )
                          ))}
                        </ul>
                      </div>
                    )}

                    <button 
                      onClick={() => setIsApplicationModalOpen(true)}
                      className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      {t.apply}
                    </button>
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-xl shadow-lg flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-center text-gray-500">
                      <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>{t.selectPosition}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      {isApplicationModalOpen && selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => {
            setIsApplicationModalOpen(false);
            setApplicationSuccess(false);
          }}
          onSubmit={(data) => {
            // Add application as a message
            addMessage({
              name: data.fullName,
              email: data.email,
              subject: `Vakansiya müraciəti: ${selectedJob.title}`,
              message: `
Vakansiya: ${selectedJob.title}
Telefon: ${data.phone}
CV Faylı: ${data.cvFileName}
CV Link: ${data.cv}

Əlavə məlumat: 
${data.coverLetter || 'Yoxdur'}
              `.trim()
            });
            setApplicationSuccess(true);
            setTimeout(() => {
              setIsApplicationModalOpen(false);
              setApplicationSuccess(false);
            }, 3000);
          }}
          success={applicationSuccess}
        />
      )}
    </div>
    <Footer />
    </>
  );
}

function ApplicationModal({ 
  job, 
  onClose, 
  onSubmit,
  success 
}: { 
  job: any; 
  onClose: () => void; 
  onSubmit: (data: any) => void;
  success: boolean;
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cv: '',
    coverLetter: ''
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Yalnız PDF və Word (.doc, .docx) faylları qəbul edilir');
        return;
      }

      // Validate file size (max 15MB)
      const maxSize = 15 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadError('Fayl ölçüsü 15MB-dan çox ola bilməz');
        return;
      }

      setCvFile(file);
      setUploadError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cvFile) {
      setUploadError('CV faylı seçin');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      // Upload CV to Firebase Storage
      const cvUrl = await uploadCV(cvFile, formData.fullName);
      
      // Submit form with CV URL
      onSubmit({
        ...formData,
        cv: cvUrl,
        cvFileName: cvFile.name
      });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'CV yüklənərkən xəta baş verdi');
      setIsUploading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Müraciətiniz qəbul edildi!</h3>
          <p className="text-gray-600">
            Tezliklə sizinlə əlaqə saxlayacağıq. Təşəkkür edirik!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Müraciət Et</h2>
            <p className="text-sm text-gray-600 mt-1">{job.title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Adınız və soyadınız"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="+994 XX XXX XX XX"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CV (Resume) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="cv-upload"
                required
              />
              <label
                htmlFor="cv-upload"
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-center gap-3 bg-gray-50 hover:bg-blue-50"
              >
                {cvFile ? (
                  <>
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{cvFile.name}</span>
                    <span className="text-xs text-gray-500">({(cvFile.size / 1024).toFixed(0)} KB)</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">CV faylını seçin və ya buraya sürüşdürün</span>
                  </>
                )}
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              PDF, DOC və ya DOCX formatında, maksimum 15MB
            </p>
            {uploadError && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <X className="w-3 h-3" />
                {uploadError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Əlavə məlumat (Cover Letter)
            </label>
            <textarea
              value={formData.coverLetter}
              onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={4}
              placeholder="Özünüz haqqında qısa məlumat, niyə bu vəzifə üçün uyğun olduğunuzu yazın..."
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Qeyd:</strong> Müraciətiniz qəbul edildikdən sonra, HR departamentimiz sizinlə əlaqə saxlayacaq. 
              Bütün məlumatlarınız məxfi saxlanılır.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isUploading || !cvFile}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  CV yüklənir...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Müraciəti Göndər
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Ləğv et
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
