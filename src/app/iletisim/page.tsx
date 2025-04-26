'use client';

import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import MetaTags from '@/components/common/MetaTags';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// İletişim bilgileri
const contactInfo = {
  address: 'Levent Mahallesi, Büyükdere Caddesi No:123, 34330 Beşiktaş/İstanbul',
  phone: '+90 (212) 555 XX XX',
  fax: '+90 (212) 555 XX XX',
  email: 'info@balfora.com.tr',
  workHours: 'Pazartesi - Cuma: 09:00 - 18:00',
  socialMedia: [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/balfora', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com/balfora', icon: 'twitter' },
    { name: 'Instagram', url: 'https://instagram.com/balfora', icon: 'instagram' },
    { name: 'YouTube', url: 'https://youtube.com/balfora', icon: 'youtube' },
  ],
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form gönderiliyor:', formData);
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message || !formData.subject || !formData.privacy) {
      console.log('Form validation hatası:', { 
        name: !formData.name, 
        email: !formData.email, 
        message: !formData.message, 
        subject: !formData.subject, 
        privacy: !formData.privacy 
      });
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: 'Lütfen tüm zorunlu alanları doldurun ve gizlilik politikasını onaylayın.'
      });
      return;
    }
    
    setFormStatus({
      ...formStatus,
      isSubmitting: true,
      isError: false,
      message: ''
    });
    
    try {
      // Submit form data to Supabase
      const { error } = await supabase
        .from('contact_forms')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject,
            message: formData.message,
            is_read: false
          }
        ]);
        
      if (error) {
        console.error('Supabase hata detayı:', error);
        throw error;
      }
      
      console.log('Form başarıyla gönderildi:', formData);
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.'
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false
      });
      
      console.log('Form temizlendi, işlem tamamlandı.');
      
    } catch (error: any) {
      console.error('Form gönderim hatası:', error);
      
      // Detaylı hata mesajı
      const errorMessage = error.message || error.details || error.hint || 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
      console.error('Hata detayları:', { error, message: errorMessage });
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: errorMessage
      });
    }
  };

  return (
    <>
      <MetaTags 
        title="İletişim"
        description="Bal & Fora Yatırım ile iletişime geçin. Sorularınız ve yatırım danışmanlığı için bizimle irtibata geçebilirsiniz."
        keywords="iletişim, bal ve fora, yatırım, finans, portföy yönetimi, fon, yatırım danışmanlığı"
        ogUrl="https://balfora.com/iletisim"
      />
      
      <ErrorBoundary>
        <PageLayout>
          {/* Hero Section */}
          <section className="relative bg-hero-gradient text-text-light py-24">
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 to-background-dark/70 z-0"></div>
            <div className="container mx-auto px-4 md:px-8 z-10 relative">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">İletişim</h1>
                <p className="text-xl text-gray-300">
                  Sorularınız ve işbirliği fırsatları için bizimle iletişime geçin
                </p>
              </div>
            </div>
          </section>
          
          {/* İletişim Formu ve Bilgiler */}
          <SectionContainer background="light">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* İletişim Formu */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-lg shadow-soft p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Yazın</h2>
                  
                  {formStatus.isSubmitted ? (
                    <div className="p-4 mb-4 text-sm rounded-lg bg-green-100 text-green-800">
                      {formStatus.message}
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {formStatus.isError && (
                        <div className="p-4 mb-4 text-sm rounded-lg bg-red-100 text-red-800">
                          {formStatus.message}
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Adınız Soyadınız
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Adınız ve soyadınız"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            E-posta Adresiniz
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="E-posta adresiniz"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Telefon numaranız"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Konu
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="">Lütfen bir konu seçin</option>
                          <option value="Yatırım">Yatırım Bilgileri</option>
                          <option value="Fonlar">Fonlarımız Hakkında</option>
                          <option value="Kariyer">Kariyer Fırsatları</option>
                          <option value="Medya">Basın ve Medya</option>
                          <option value="Diğer">Diğer</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Mesajınız
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Mesajınızı buraya yazın"
                        ></textarea>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy"
                            name="privacy"
                            type="checkbox"
                            checked={formData.privacy}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="privacy" className="text-gray-600">
                            Kişisel verilerimin işlenmesine ilişkin <a href="#" className="text-primary hover:underline">gizlilik politikasını</a> okudum ve onaylıyorum.
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="w-full"
                          type="submit"
                          disabled={formStatus.isSubmitting}
                        >
                          {formStatus.isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <LoadingSpinner size="sm" color="white" />
                              <span className="ml-2">Gönderiliyor...</span>
                            </span>
                          ) : (
                            'Gönder'
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
              
              {/* İletişim Bilgileri */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-lg shadow-soft p-8 h-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgilerimiz</h2>
                  
                  <div className="space-y-8">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Adres</h3>
                        <p className="mt-1 text-gray-600">
                          {contactInfo.address}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Telefon</h3>
                        <p className="mt-1 text-gray-600">
                          {contactInfo.phone}
                        </p>
                        <p className="mt-1 text-gray-600">
                          Faks: {contactInfo.fax}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">E-posta</h3>
                        <p className="mt-1 text-gray-600">
                          <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">
                            {contactInfo.email}
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Çalışma Saatleri</h3>
                        <p className="mt-1 text-gray-600">
                          {contactInfo.workHours}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Sosyal Medya</h3>
                      <div className="flex space-x-4">
                        {contactInfo.socialMedia.map((social) => (
                          <a 
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-10 w-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
                          >
                            {social.icon === 'linkedin' && (
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            )}
                            {social.icon === 'twitter' && (
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0
                                01 2.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            )}
                            {social.icon === 'instagram' && (
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            )}
                            {social.icon === 'youtube' && (
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                              </svg>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
          
          {/* Harita */}
          <SectionContainer background="gray">
            <SectionTitle 
              title="Bize Ulaşın"
              subtitle="Ofisimizin konumu"
            />
            
            <div className="bg-white rounded-lg shadow-soft p-0 overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 lg:aspect-h-6">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.341497793749!2d29.00500431572576!3d41.067908224559136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a24975a0ad%3A0xe29c1c714a8e97a1!2sB%C3%BCy%C3%BCkdere%20Cd.%2C%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1613472892742!5m2!1str!2str"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </SectionContainer>
          
          {/* Alt CTA Bölümü */}
          <SectionContainer background="secondary" className="text-text-light">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Yatırımlarınız Hakkında Bilgi Almak İster Misiniz?</h2>
                <p className="text-gray-200 mb-6">
                  Uzman danışmanlarımız sizinle iletişime geçerek yatırım hedefleriniz doğrultusunda kişiselleştirilmiş çözümler sunabilir.
                </p>
                <Button variant="primary" size="lg">
                  Yatırım Danışmanı Talep Et
                </Button>
              </div>
              
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute -top-16 -right-16 h-64 w-64 bg-primary/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-8 -left-8 h-48 w-48 bg-primary/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10 w-full max-w-md mx-auto h-64 bg-gradient-to-br from-primary-light to-primary rounded-lg shadow-xl flex items-center justify-center">
                    <span className="text-xl font-semibold text-secondary">Yatırım Danışmanlığı</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </PageLayout>
      </ErrorBoundary>
    </>
  );
} 