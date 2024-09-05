'use client';
import { Header } from '@/sections/home';
import Footer from '@/components/footer/Footer';
import { ProfilePictureProvider } from '@/contexts/ProfilePictureUpdatedContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProfilePictureProvider>
        <Header />
        {children}
        <Footer />
      </ProfilePictureProvider>
    </>
  );
}
