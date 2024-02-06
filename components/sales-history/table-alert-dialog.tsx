'use client';
import React from 'react';
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  fnSalesTotal,
  formatedPriceByCurrency,
  handleItemState,
} from '@/lib/admin.dashboard';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Datum } from '@/lib/interface';
import InputToShow from './input-to-show';
const TableAlertDialog = ({ sales }: { sales: Datum[] }) => {
  const [item, setItem] = React.useState<Datum>();
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
          {sales?.map((itm) => (
            <TableRow key={itm.id}>
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
                    <DropdownMenuItem
                      onClick={() => handleItemState(setItem, item, itm)}
                    >
                      View Invoice
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog
        open={Boolean(item)}
        onOpenChange={() => handleItemState(setItem, item)}
      >
        <AlertDialogContent className='bg-[#F7F7FA]'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              Client ID <br /> {item?.id}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className='w-full'>
            <div className=' mx-auto space-y-4 '>
              <InputToShow value={item?.clientId.name} label='Client Name' />
              <div className='grid grid-cols-12 gap-4'>
                <InputToShow
                  className='col-span-8'
                  value={item?.branchOfficeId.name}
                  label='BranchOffice'
                />
                <InputToShow
                  className='col-span-4'
                  value={item?.branchOfficeId.currency}
                  label='Currency'
                />
              </div>
              <div>
                <h3 className='font-semibold text-center mx-auto w-full mb-1'>
                  Product List [{item?.products?.length}]
                </h3>
                <div className='space-y-10 max-h-96 overflow-auto px-1 pb-1'>
                  {item?.products?.map((itm, i) => (
                    <div
                      key={itm.id}
                      className='grid grid-cols-12 gap-4 gap-y-2'
                    >
                      <InputToShow
                        className='col-span-12'
                        value={itm.nameProduct}
                        label={`Name Product ${i + 1}`}
                      />
                      <InputToShow
                        className='col-span-3'
                        value={itm.quantity}
                        label='Qty'
                      />
                      <InputToShow
                        className='col-span-4'
                        label='Price'
                        value={formatedPriceByCurrency(
                          item?.branchOfficeId?.currency,
                          itm.price
                        )}
                      />
                      <InputToShow
                        className='col-span-5'
                        value={formatedPriceByCurrency(
                          item?.branchOfficeId?.currency,
                          itm.subtotal
                        )}
                        label='SubTotal'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Total:{' '}
              {formatedPriceByCurrency(
                item?.branchOfficeId?.currency,
                fnSalesTotal(item)
              )}
            </AlertDialogCancel>
            <AlertDialogAction>Its Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TableAlertDialog;
