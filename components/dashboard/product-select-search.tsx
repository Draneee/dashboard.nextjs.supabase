'use client';
import React from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ComboboxForm } from '../ui/compo-box';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { formatedDataClient } from '@/lib/admin.dashboard';

const ProductSelectSearch = ({ field, form, i }: IProps) => {
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

  return (
    <FormItem className='col-span-6'>
      <FormLabel>Name</FormLabel>
      <div className='flex flex-col'>
        <FormControl>
          <ComboboxForm
            field={field}
            label='Product'
            selectOptions={formatedDataClient(data)}
            form={form}
            name={`details.${i}.idProduct`}
            handlerSearch={handleSearch}
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default ProductSelectSearch;

interface IProps {
  field: any;
  form: any;
  i: any;
}
