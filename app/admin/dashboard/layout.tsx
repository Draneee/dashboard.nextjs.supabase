import Sidebar from '@/components/dashboard/Sidebar';
import type { Metadata } from 'next';
import Image from 'next/image';

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
      <body className='flex min-h-screen w-full font-body'>
        <Sidebar />
        <main className='w-full py-12 px-20 bg-[#F7F7FA]'>
          <header className='flex items-center w-full gap-4 mb-8'>
            <Image
              src={'/custom-svg/person-with-box.svg'}
              alt='person with box'
              className='w-12 h-auto'
              width={0}
              height={0}
            />
            <section className='w-full'>
              <h1 className='text-4xl font-extrabold border-b-2 w-full pb-2 border-[#CEDDED] text-blueTestDark'>
                New Sale
              </h1>
            </section>
          </header>

          {children}
        </main>
      </body>
    </html>
  );
}
