import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Bal & Fora Yatırım | Profesyonel Portföy Yönetimi',
  description: 'Bal & Fora Yatırım ile profesyonel portföy yönetimi, yatırım fonları ve varlık yönetimi hizmetleri.',
  keywords: 'portföy yönetimi, yatırım fonu, finansal danışmanlık, varlık yönetimi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${poppins.variable} ${montserrat.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
