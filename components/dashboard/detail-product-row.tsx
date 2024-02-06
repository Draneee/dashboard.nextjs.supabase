import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import ProductSelectSearch from './product-select-search';
import { Input } from '../ui/input';
import Image from 'next/image';
import { ComboboxForm } from '../ui/compo-box';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  arrFindById,
  calculateSubTotal,
  formatedDataClient,
  formatedPriceByCurrency,
} from '@/lib/admin.dashboard';
import { Label } from '../ui/label';
import { UseFieldArrayUpdate } from 'react-hook-form';

const DetailProductRow = ({ form, idx, remove, actualCurrency }: IProps) => {
  const supabase = createClientComponentClient();
  const [data, setData] = React.useState<any[] | null>(null);
  const [search, setSearch] = React.useState('');
  React.useEffect(() => {
    const fetchClient = async () => {
      let query = supabase.from('Product').select('*');
      if (search.trim() !== '') {
        query = query.like('name', `%${search}%`);
      }
      let { data: Product } = await query.range(0, 9);
      setData(Product);
    };

    fetchClient();
  }, [, search]);
  const handleSearch = (e: React.FormEvent<HTMLDivElement>) =>
    setSearch((e.target as HTMLInputElement).value);

  const objSeclected = arrFindById(
    form.watch(`details.${idx}.nameProduct`),
    data
  );

  const subTotalCalc = calculateSubTotal(
    form.watch(`details.${idx}.quantity`),
    objSeclected?.price
  );

  const priceFormated = formatedPriceByCurrency(
    actualCurrency,
    objSeclected?.price
  );
  const subTotalFormated = formatedPriceByCurrency(
    actualCurrency,
    subTotalCalc
  );

  React.useEffect(() => {
    form.setValue(`details.${idx}.price`, objSeclected?.price);
    form.setValue(`details.${idx}.subTotal`, subTotalCalc);
  }, [objSeclected, form.watch(`details.${idx}.quantity`)]);

  return (
    <div className='flex gap-2'>
      <section className='grid grid-cols-12 gap-4 mb-5 flex-1'>
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
                    label='Product'
                    selectOptions={formatedDataClient(data)}
                    form={form}
                    name={`details.${idx}.nameProduct`}
                    handlerSearch={handleSearch}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full col-span-6 gap-2'>
          <div className='grid grid-cols-6 gap-4 flex-1 w-full'>
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
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='col-span-2 space-y-1.5'>
              <Label>Price</Label>
              <Input
                type='text'
                placeholder='Price...'
                readOnly
                value={priceFormated}
              />
            </div>
            <div className='col-span-2 space-y-1.5'>
              <Label>Subtotal</Label>
              <Input
                placeholder='Subtotal...'
                readOnly
                value={subTotalFormated}
              />
            </div>
          </div>
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
      </section>
    </div>
  );
};

export default DetailProductRow;
interface IProps {
  form: any;
  idx: any;
  remove: (i: number) => void;
  actualCurrency: string;
}
