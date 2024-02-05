'use client';

import InputNewSale from '@/components/dashboard/input-new-sale';
import { Input } from '@/components/ui/input';
import { calcTotal, formSchemaNewSale, objEmpty } from '@/lib/admin.dashboard';
import Image from 'next/image';
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
import { ComboboxForm } from '../ui/compo-box';
import { AddNewClient } from './add-new-client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ClientSelectSearch from './client-select-search';

export function FormDocumentProduct() {
  const form = useForm<z.infer<typeof formSchemaNewSale>>({
    resolver: zodResolver(formSchemaNewSale),
    defaultValues: {
      details: [objEmpty],
    },
  });

  function onSubmit(values: z.infer<typeof formSchemaNewSale>) {
    console.log(values);
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'details',
  });

  const handleStateAddArray = () =>
    append({ id: '2', nameProduct: '', quantity: 0, price: 0, subtotal: 0 });

  const total = calcTotal(form);

  const supabase = createClientComponentClient();
  React.useEffect(() => {
    const fetchClient = async () => {
      let { data: Client, error } = await supabase.from('Client').select();

      console.log(Client);
    };

    fetchClient();
  }, []);
  console.log(form.watch('client'));
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
                        <SelectItem value='m@example.com'>
                          m@example.com
                        </SelectItem>
                        <SelectItem value='m@google.com'>
                          m@google.com
                        </SelectItem>
                        <SelectItem value='m@support.com'>
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='currency'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder='USD' readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          </article>
          <article>
            <h3 className='text-2xl font-semibold mb-3'>Details</h3>
            {fields.map((itm, idx) => (
              <div className='flex gap-2' key={itm.id}>
                <section
                  key={itm.id}
                  className='grid grid-cols-12 gap-4 mb-5 flex-1'
                >
                  <FormField
                    control={form.control}
                    name={`details.${idx}.nameProduct`}
                    render={({ field }) => (
                      <FormItem className='col-span-6'>
                        <FormLabel>Name</FormLabel>
                        <div className='flex flex-col'>
                          <FormControl>
                            <ComboboxForm
                              field={field}
                              form={form}
                              name={`details.${idx}.nameProduct`}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`details.${idx}.quantity`}
                    render={({ field }) => (
                      <FormItem className='col-span-2'>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Quantity...'
                            {...field}
                            readOnly
                            onChange={(e) => {
                              field.onChange(parseInt(e.target.value));
                              const price = form.getValues(
                                `details.${idx}.price`
                              );
                              const quantity = parseInt(e.target.value);
                              const subtotal = price * quantity || 0;
                              form.setValue(
                                `details.${idx}.subtotal`,
                                subtotal
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`details.${idx}.price`}
                    render={({ field }) => (
                      <FormItem className='col-span-2'>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Price...'
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`details.${idx}.subtotal`}
                    render={({ field }) => (
                      <FormItem className='col-span-2'>
                        <FormLabel>Subtotal</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='subtotal...'
                            // readOnly
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
                <button
                  onClick={() => remove(idx)}
                  className='bg-blueTest h-10 w-10 grid place-items-center mt-[30px]'
                >
                  <Image
                    src={'/custom-svg/x.svg'}
                    alt='x'
                    width={0}
                    height={0}
                    className='h-3 w-3'
                  />
                </button>
              </div>
            ))}

            <button
              onClick={handleStateAddArray}
              className='bg-blueTest text-white font-semibold py-2 px-8 mb-7 hover:scale-105 transition'
            >
              Add
            </button>
            <footer className='flex justify-end'>
              <div className='flex items-center gap-2'>
                <Label htmlFor='total'>Total</Label>
                <Input
                  id='total'
                  className='min-w-56'
                  value={isNaN(total) ? 0 : total}
                />
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
