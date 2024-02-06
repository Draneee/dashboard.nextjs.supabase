import LayoutComponent from '@/components/dashboard/layout-component';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <LayoutComponent>{children}</LayoutComponent>
    </html>
  );
}
