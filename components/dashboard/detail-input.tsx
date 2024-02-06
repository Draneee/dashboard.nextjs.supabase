'use client';
import { Input } from '@/components/ui/input';
import {
  calcTotal,
  formSchemaNewSale,
  formatedPriceByCurrency,
  objEmpty,
} from '@/lib/admin.dashboard';
import React from 'react';
import { Label } from '../ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ClientSelectSearch from './client-select-search';
import DetailProductRow from './detail-product-row';

export function FormDocumentProduct() {
  const form = useForm<z.infer<typeof formSchemaNewSale>>({
    resolver: zodResolver(formSchemaNewSale),
    defaultValues: {
      details: [objEmpty],
    },
  });
  const total = calcTotal(form);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'details',
  });

  const handleStateAddArray = () =>
    append({
      id: crypto.randomUUID(),
      nameProduct: '',
      quantity: 0,
      price: '0',
      subTotal: 0,
    });

  const supabase = createClientComponentClient();
  const [branchOffice, setBranchOffice] = React.useState<any[] | null>(null);
  React.useEffect(() => {
    const fetchClient = async () => {
      let { data: BranchOffice } = await supabase.from('BranchOffice').select();
      setBranchOffice(BranchOffice);
    };
    fetchClient();
  }, []);

  const currencySelect = (id: string) =>
    branchOffice?.find((itm) => itm.id === id);

  const actualCurrency = currencySelect(form.watch('branchOffice'))?.currency;
  const totalFormated = formatedPriceByCurrency(actualCurrency, total);
  console.log(total);
  async function onSubmit(values: z.infer<typeof formSchemaNewSale>) {
    console.log(values);

    const { error } = await supabase.from('Sales').insert({
      clientId: values.client,
      branchOfficeId: values.branchOffice,
      total: total,
      products: values.details.map((itm) => {
        console.log(itm);
        return {
          id: itm.nameProduct,
          nameProduct: itm.nameProduct,
          quantity: itm.quantity,
          subtotal: itm.subTotal,
        };
      }),
    });

    console.log(error);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <article>
            <h3 className='text-2xl font-semibold mb-3'>Document</h3>
            <section className='grid grid-cols-12 gap-4 w-full'>
              <FormField
                control={form.control}
                name='client'
                render={({ field }) => (
                  <ClientSelectSearch field={field} form={form} />
                )}
              />
              <FormField
                control={form.control}
                name='branchOffice'
                render={({ field }) => (
                  <FormItem className='col-span-4'>
                    <FormLabel>Branch Office</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a Office' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branchOffice?.map((itm) => (
                          <SelectItem value={itm.id}>{itm.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='col-span-2 space-y-1.5'>
                <Label>Currency</Label>
                <Input placeholder='USD' readOnly value={actualCurrency} />
              </div>
            </section>
          </article>
          <article>
            <h3 className='text-2xl font-semibold mb-3'>Details</h3>
            {fields.map((itm, idx) => (
              <DetailProductRow
                idx={idx}
                form={form}
                key={itm.id}
                remove={remove}
                actualCurrency={actualCurrency}
              />
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleStateAddArray();
              }}
              className='bg-blueTest text-white font-semibold py-2 px-8 mb-7 hover:scale-105 transition'
            >
              Add
            </button>
            <footer className='flex justify-end'>
              <div className='flex items-center gap-2'>
                <Label htmlFor='total'>Total</Label>
                <Input id='total' className='min-w-56' value={totalFormated} />
              </div>
            </footer>
          </article>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='text-white font-semibold py-2 px-8 hover:scale-105 transition bg-blueTest'
            >
              Submit
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
