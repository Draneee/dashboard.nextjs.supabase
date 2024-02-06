import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { formatedPriceByCurrency } from '@/lib/admin.dashboard';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export default async function SalesHistory() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  let { data: Sales, error } = await supabase.from('Sales').select(`
    clientId (
      name
    ),
    branchOfficeId (
      name,
      currency
    ),
    total,
    products
  `);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Branch Office</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Product Quantity</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {Sales?.map((itm) => (
            <TableRow>
              <TableCell className='font-medium'>{itm.clientId.name}</TableCell>
              <TableCell>{itm.branchOfficeId.name}</TableCell>
              <TableCell>{itm.branchOfficeId.currency}</TableCell>
              <TableCell>{itm.products?.length}</TableCell>
              <TableCell>
                {formatedPriceByCurrency(
                  itm.branchOfficeId.currency,
                  itm.total
                )}
              </TableCell>
              <TableCell className='w-8'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Invoice</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </div>
  );
}
