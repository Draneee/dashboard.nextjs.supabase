import { FormDocumentProduct } from '@/components/dashboard/detail-input';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Database } from '@/lib/database.types';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin');
  }

  return (
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

      <FormDocumentProduct />
    </main>
  );
}
