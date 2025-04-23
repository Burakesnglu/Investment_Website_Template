import Link from 'next/link';
import Image from 'next/image';

// Navigation items grouped by category
const footerLinks = [
  {
    title: 'Kurumsal',
    links: [
      { name: 'Hakkımızda', href: '/hakkimizda' },
      { name: 'Ekibimiz', href: '/hakkimizda#ekibimiz' },
      { name: 'Değerlerimiz', href: '/hakkimizda#degerlerimiz' },
      { name: 'Ortaklık Yapımız', href: '/hakkimizda#ortaklik-yapimiz' },
    ],
  },
  {
    title: 'Yatırım Ürünleri',
    links: [
      { name: 'Fonlarımız', href: '/fonlarimiz' },
      { name: 'Performans', href: '/fonlarimiz#performans' },
      { name: 'Fon Karşılaştırma', href: '/fonlarimiz#karsilastirma' },
      { name: 'Yatırımcı Profili Testi', href: '/fonlarimiz#yatirimci-profili' },
    ],
  },
  {
    title: 'Bilgi Merkezi',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'S.S.S.', href: '/sss' },
      { name: 'Yatırımcı İlişkileri', href: '/yatirimci-iliskileri' },
      { name: 'İletişim', href: '/iletisim' },
    ],
  },
];

// Contact information
const contactInfo = {
  address: 'Levent Mahallesi, Büyükdere Caddesi No:201, 34394 Şişli/İstanbul',
  phone: '+90 (212) 123 45 67',
  email: 'info@balfora.com.tr',
};

// Social media links
const socialMedia = [
  { name: 'LinkedIn', href: 'https://linkedin.com/', icon: '/linkedin.svg' },
  { name: 'Twitter', href: 'https://twitter.com/', icon: '/twitter.svg' },
  { name: 'Instagram', href: 'https://instagram.com/', icon: '/instagram.svg' },
  { name: 'YouTube', href: 'https://youtube.com/', icon: '/youtube.svg' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-text-light">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Subscription */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <div className="font-bold text-2xl text-primary mb-4">BAL & FORA</div>
              <p className="text-sm text-gray-300 mb-6">
                Bal & Fora Yatırım, uzun vadeli ve sürdürülebilir getiri odaklı yatırım stratejileri ile yatırımcılarına hizmet vermektedir.
              </p>
            </div>
            
            {/* Newsletter Form */}
            <div>
              <h4 className="font-medium mb-3">Bültenimize Abone Olun</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz" 
                  className="flex-grow bg-secondary-light text-white border border-gray-600 rounded-l-md px-3 py-2 focus:outline-none focus:border-primary"
                />
                <button className="bg-primary hover:bg-primary-dark text-text-dark px-4 py-2 rounded-r-md transition-colors duration-300">
                  Gönder
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer Link Groups */}
          {footerLinks.map((group, idx) => (
            <div key={idx}>
              <h4 className="font-medium mb-4 text-primary">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        {/* Contact and Social */}
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h4 className="font-medium mb-4 text-primary">İletişim</h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p>{contactInfo.address}</p>
              <p>Tel: {contactInfo.phone}</p>
              <p>E-posta: {contactInfo.email}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-primary">Bizi Takip Edin</h4>
            <div className="flex space-x-4">
              {socialMedia.map((platform, idx) => (
                <a 
                  key={idx}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 hover:bg-primary transition-colors duration-200"
                  aria-label={platform.name}
                >
                  {/* This would use SVG icons, using div placeholders for now */}
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Disclaimer and Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-xs text-gray-400">
          <p className="mb-4">
            Sitede yer alan analizler yatırım tavsiyesi değildir. Yatırım kararları kişisel sorumluluk gerektirir.
          </p>
          <p>
            © {currentYear} Bal & Fora Yatırım. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
} 