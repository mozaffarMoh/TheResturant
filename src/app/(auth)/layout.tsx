import AuthFooter from '@/components/auth-footer/AuthFooter';

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      <AuthFooter />
    </section>
  );
}
