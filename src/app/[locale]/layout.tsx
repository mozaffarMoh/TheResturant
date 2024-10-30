import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const metadata: Metadata = {
  title: 'The ExpertTeam & Partner',
  description: 'Welcome To The The ExpertTeam & Partner Website',
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  const messages = await getMessages();
  const isArabic = locale === 'ar';
  metadata.title = isArabic
    ? 'فريق الخبراء وشريكهم'
    : 'The ExpertTeam & Partner';

  return (
    <html
      lang={locale}
      dir={isArabic ? 'rtl' : 'ltr'}
      className={isArabic ? 'arabicFont' : 'englishFont'}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
