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

  return <FormDocumentProduct />;
}
