// Home Page Data

export const heroData = {
  title: "Geleceğinizi <span>Güçlendiren</span> Yatırım Çözümleri",
  subtitle: "Profesyonel portföy yönetimi ve kişiselleştirilmiş yatırım stratejileri ile finansal hedeflerinize ulaşmanıza yardımcı oluyoruz.",
  primaryButtonText: "Fonlarımızı Keşfedin",
  primaryButtonLink: "/fonlarimiz",
  secondaryButtonText: "Bize Ulaşın",
  secondaryButtonLink: "/iletisim"
};

export const servicesData = {
  title: "Hizmetlerimiz",
  subtitle: "Bal & Fora Yatırım olarak finansal hedeflerinize ulaşmanız için profesyonel çözümler sunuyoruz",
  services: [
    {
      id: 1,
      title: "Portföy Yönetimi",
      description: "Risk profilinize ve yatırım hedeflerinize göre özelleştirilmiş profesyonel portföy yönetim hizmetleri sunuyoruz.",
      icon: "/icons/portfolio-icon.svg",
      link: "/hizmetlerimiz/portfoy-yonetimi"
    },
    {
      id: 2,
      title: "Yatırım Fonları",
      description: "Farklı risk ve getiri beklentilerine uygun, çeşitlendirilmiş yatırım fonları ile finansal hedeflerinize ulaşmanızı sağlıyoruz.",
      icon: "/icons/investment-icon.svg",
      link: "/fonlarimiz"
    },
    {
      id: 3,
      title: "Varlık Yönetimi",
      description: "Bireysel ve kurumsal müşterilerimiz için uzun vadeli değer yaratmaya odaklanan kapsamlı varlık yönetimi çözümleri.",
      icon: "/icons/wealth-icon.svg",
      link: "/hizmetlerimiz/varlik-yonetimi"
    }
  ]
};

export const aboutData = {
  title: "Hakkımızda",
  subtitle: "2014'ten beri finansal piyasalarda uzmanlık ve güvenilirlikle hizmet veriyoruz",
  description: [
    "Bal & Fora Yatırım, Türkiye'nin önde gelen portföy yönetim şirketlerinden biridir. Deneyimli ekibimiz ve yenilikçi yaklaşımımızla, müşterilerimizin finansal hedeflerine ulaşmaları için kişiselleştirilmiş çözümler sunuyoruz.",
    "2014 yılında kurulan şirketimiz, sürekli gelişen piyasa koşullarına adapte olan stratejileri ve müşteri odaklı yaklaşımı ile sektörde fark yaratmaktadır."
  ],
  buttonText: "Daha Fazla Bilgi",
  buttonLink: "/hakkimizda",
  stats: [
    { value: "10+", label: "Yıllık Deneyim" },
    { value: "₺3.2M+", label: "Yönetilen Varlık" },
    { value: "850+", label: "Mutlu Müşteri" }
  ]
};

export const whyUsData = {
  title: "Neden Biz?",
  subtitle: "Bal & Fora Yatırım ile fark yaratın",
  features: [
    { 
      id: 1, 
      title: "Uzman Ekip", 
      description: "Alanında uzman ve deneyimli finansal danışmanlarımız ile yüksek performanslı portföy yönetimi sunuyoruz."
    },
    { 
      id: 2, 
      title: "Şeffaf Yaklaşım", 
      description: "Tüm süreçlerde şeffaflık ilkesiyle hareket ediyor, düzenli raporlama ile yatırımlarınızı sürekli izlemenizi sağlıyoruz."
    },
    { 
      id: 3, 
      title: "Kişiselleştirilmiş Stratejiler", 
      description: "Her müşterimizin risk profili ve finansal hedeflerine uygun özelleştirilmiş yatırım stratejileri geliştiriyoruz."
    }
  ]
};

export const statsData = {
  title: "Rakamlarla Bal & Fora",
  subtitle: "Başarımızı rakamlar konuşuyor",
  stats: [
    { id: 1, value: "850+", label: "Aktif Müşteri" },
    { id: 2, value: "₺3.2", label: "Milyar TL", sublabel: "Yönetilen Varlık" },
    { id: 3, value: "8", label: "Farklı Fon" },
    { id: 4, value: "9", label: "Yıl", sublabel: "Deneyim" }
  ]
};

export const reportsData = {
  title: "Son Raporlar",
  subtitle: "En güncel finansal analiz ve raporlarımız",
  reports: [
    {
      id: 1,
      title: "2023 Yılı 3. Çeyrek Ekonomik Görünüm Raporu",
      date: "28 Ekim 2023",
      image: "/images/report-1.jpg",
      link: "/raporlar/2023-q3-ekonomik-gorunum"
    },
    {
      id: 2,
      title: "Teknoloji Sektörü Görünümü ve Yatırım Önerileri",
      date: "15 Eylül 2023",
      image: "/images/report-2.jpg",
      link: "/raporlar/teknoloji-sektoru-gorunumu"
    },
    {
      id: 3,
      title: "Eylül 2023 Fon Bülteni",
      date: "05 Eylül 2023",
      image: "/images/report-3.jpg",
      link: "/raporlar/eylul-2023-fon-bulteni"
    }
  ]
};

export const faqData = {
  title: "Sıkça Sorulan Sorular",
  subtitle: "Merak ettiğiniz soruların cevapları",
  faqs: [
    {
      id: 1,
      question: "Yatırım fonlarına nasıl yatırım yapabilirim?",
      answer: "Bal & Fora Yatırım fonlarına yatırım yapmak için öncelikle müşteri kaydınızı oluşturmanız gerekiyor. Online başvuru formunu doldurabilir veya ofisimizi ziyaret edebilirsiniz. Ardından, elektronik sözleşme sürecini tamamlayarak yatırım yapmaya başlayabilirsiniz."
    },
    {
      id: 2,
      question: "Fonlara minimum ne kadar yatırım yapabilirim?",
      answer: "Fonlarımızın minimum yatırım tutarı fon türüne göre değişmektedir. Hisse senedi fonlarında minimum 10.000 TL, sabit getirili fonlarda 25.000 TL ve karma fonlarda 15.000 TL'dir. Detaylı bilgi için fon sayfalarımızı inceleyebilirsiniz."
    },
    {
      id: 3,
      question: "Yatırımımı ne zaman geri çekebilirim?",
      answer: "Fonlarımızdaki yatırımlarınızı fon türüne bağlı olarak günlük, haftalık veya aylık likidite dönemlerinde çekebilirsiniz. Hisse senedi ve para piyasası fonlarında günlük likidite, diğer fonlarda ise haftalık veya aylık likidite geçerlidir."
    }
  ]
};

export const blogData = {
  title: "Blog",
  subtitle: "En son makalelerimiz ve finansal içerikler",
  posts: [
    {
      id: 1,
      title: "2023 Yılı 3. Çeyrek Ekonomik Görünüm",
      excerpt: "2023 yılının üçüncü çeyreğinde Türkiye ekonomisinin genel durumu, enflasyon ve büyüme beklentileri hakkında detaylı analiz...",
      date: "28 Ekim 2023",
      author: "Ahmet Şimşek",
      image: "/images/blog-1.jpg",
      link: "/blog/2023-q3-ekonomik-gorunum"
    },
    {
      id: 2,
      title: "Teknoloji Sektörü Görünümü",
      excerpt: "Teknoloji sektöründe son gelişmeler, yatırım fırsatları ve sektörün geleceğine dair öngörüler...",
      date: "15 Eylül 2023",
      author: "Berna Yılmaz",
      image: "/images/blog-2.jpg",
      link: "/blog/teknoloji-sektoru-gorunumu"
    },
    {
      id: 3,
      title: "Eylül 2023 Fon Bülteni",
      excerpt: "Eylül ayı fon performansları, piyasa değerlendirmeleri ve gelecek dönem beklentileri...",
      date: "05 Eylül 2023",
      author: "Caner Akdoğan",
      image: "/images/blog-3.jpg",
      link: "/blog/eylul-2023-fon-bulteni"
    }
  ]
}; 