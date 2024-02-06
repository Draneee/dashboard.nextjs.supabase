import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { SalesData } from '@/lib/interface';
import TableAlertDialog from '@/components/sales-history/table-alert-dialog';

export default async function SalesHistory() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  let { data: Sales, error } = (await supabase.from('Sales').select(`
    clientId (
      name
    ),
    branchOfficeId (
      name,
      currency
    ),
    total,
    products,
    id
  `)) as SalesData;

  Sales = Sales?.reverse();
  return <TableAlertDialog sales={Sales} />;
}
