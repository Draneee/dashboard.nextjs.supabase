import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  calcTotal,
  formSchemaNewSale,
  formatedPriceByCurrency,
  objEmpty,
} from './admin.dashboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { z } from 'zod';
import { toast } from 'sonner';

const useNewSale = () => {
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

  async function onSubmitFnNewSale(values: z.infer<typeof formSchemaNewSale>) {
    const { error } = await supabase.from('Sales').insert({
      clientId: values.client,
      branchOfficeId: values.branchOffice,
      total: total,
      products: values.details.map((itm) => {
        return {
          price: itm.price,
          id: itm.nameProduct,
          quantity: itm.quantity,
          subtotal: itm.subTotal,
          nameProduct: itm.nameProduct,
        };
      }),
    });
    if (error) {
      toast.error('Sale could not be created.');
      console.log(error);
      return;
    }

    toast.success('The sale has been successfully created.');
    form.reset();
  }
  return {
    form,
    fields,
    branchOffice,
    totalFormated,
    actualCurrency,
    remove,
    onSubmitFnNewSale,
    handleStateAddArray,
  };
};

export default useNewSale;
