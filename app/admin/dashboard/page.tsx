import { FormDocumentProduct } from '@/components/dashboard/detail-input';
import InputNewSale from '@/components/dashboard/input-new-sale';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
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
