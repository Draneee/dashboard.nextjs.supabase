import Sidebar from '@/components/dashboard/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className='flex min-h-screen w-full font-body'>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
