'use client';
import { Header } from '@/sections/home';
import Footer from '@/components/footer/Footer';
import { ProfilePictureProvider } from '@/contexts/ProfilePictureUpdatedContext';
import { useEffect } from 'react';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import Loading from '@/components/Loading/Loading';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Skeleton, Stack } from '@mui/material';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const langCurrent = pathname?.slice(1, 3) || 'en';
  const [userData, loading, getUserData, success, , errorMessage] = useGet(
    endPoints.getUserInformation,
    true,
  );

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (
      (success && !userData?.is_active) ||
      errorMessage?.includes('Unauthenticated')
    ) {
      Cookies.remove('token');
      router.push(`/${langCurrent}/guest-home`);
    }
  }, [success, errorMessage]);

  return loading ? (
    <Stack
      padding={5}
      gap={5}
    >
      <CustomSkeleton
        variant="rectangular"
        width="100%"
        height={60}
      />

      <CustomSkeleton
        variant="rectangular"
        width="100%"
        height={200}
      />
      <Stack
        direction={'row'}
        gap={5}
      >
        <CustomSkeleton
          variant="rectangular"
          width="100%"
          height={60}
        />
        <CustomSkeleton
          variant="rectangular"
          width="100%"
          height={60}
        />
      </Stack>
      <CustomSkeleton
        variant="rectangular"
        width="100%"
        height={200}
      />
    </Stack>
  ) : (
    <>
      {userData?.is_active && (
        <ProfilePictureProvider>
          <Header />
          {children}
          <Footer />
        </ProfilePictureProvider>
      )}
    </>
  );
}
