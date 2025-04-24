# Bal & Fora Yatırım Finans Web Sitesi

Bu proje, Bal & Fora Yatırım Finans şirketi için Next.js ve Tailwind CSS kullanılarak geliştirilmiş premium kurumsal bir web sitesidir.

## Geliştirme

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
# veya
yarn dev
```

[http://localhost:3000](http://localhost:3000) adresinden tarayıcınızda sonucu görebilirsiniz.

## Proje Yapısı

- `src/components`: Tüm UI bileşenleri
- `src/app`: Next.js App Router sayfaları
- `src/data`: Statik veriler
- `src/styles`: Global stil tanımları
- `src/utils`: Yardımcı fonksiyonlar
- `src/hooks`: Özel React hook'ları
- `public`: Statik dosyalar

## Vercel'de Dağıtım

Projeyi Vercel'de dağıtmak için aşağıdaki adımları izleyin:

1. [Vercel Dashboard](https://vercel.com/dashboard)'a giriş yapın
2. "New Project" butonuna tıklayın
3. GitHub, GitLab veya Bitbucket hesabınızı bağlayın ve bu projeyi seçin
4. "Import" butonuna tıklayın
5. Çevre değişkenlerini ayarlayın (gerekirse):
   - Herhangi bir API anahtarı veya özel yapılandırma gerektiren değişkenler
6. "Deploy" butonuna tıklayarak dağıtımı başlatın

Dağıtım tamamlandığında, Vercel otomatik olarak bir URL sağlayacaktır. Özel alan adınızı Vercel'in DNS ayarlarında yapılandırabilirsiniz.

### Önemli Notlar:

- Üretim ortamında gerekli olan tüm çevre değişkenlerini Vercel Dashboard'da ayarlayın
- API anahtarları gibi hassas bilgileri asla doğrudan kodunuza dahil etmeyin
- İmaj optimizasyonu için `next/image` bileşenini kullanmaya devam edin
- Vercel Analytics'i etkinleştirmeyi düşünün (isteğe bağlı)

## Sürekli Dağıtım

Vercel, GitHub'daki ana dalınıza yapılan her push'tan sonra otomatik olarak projenizi yeniden dağıtacaktır. Pull request'ler için önizleme dağıtımları da oluşturulacaktır.

## Diğer Kaynaklar

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [Tailwind CSS Dokümantasyonu](https://tailwindcss.com/docs)
- [Vercel Dağıtım Dokümantasyonu](https://vercel.org/docs/concepts/deployments/overview)
