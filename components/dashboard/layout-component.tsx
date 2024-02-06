'use client';
import Image from 'next/image';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

const LayoutComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const lastPath = pathname.split('/').pop();
  return (
    <body className='flex min-h-screen w-full font-body bg-[#F7F7FA]'>
      <Sidebar />
      <main className='w-full py-12 px-20 '>
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
              {lastPath === 'SalesHistory' ? 'Sales History' : 'New Sale'}
            </h1>
          </section>
        </header>

        {children}
      </main>
    </body>
  );
};

export default LayoutComponent;
