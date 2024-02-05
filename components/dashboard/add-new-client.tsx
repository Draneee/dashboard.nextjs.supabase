import { z } from 'zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import React from 'react';
import { handleModal } from '@/lib/admin.dashboard';

const formSchema = z.object({
  clientName: z.string(),
});

export function AddNewClient() {
  const [openModalNewClient, setOpenModalNewClient] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <AlertDialog open={openModalNewClient} onOpenChange={setOpenModalNewClient}>
      <AlertDialogTrigger asChild>
        <button
          className='bg-blueTest text-white h-10 w-10 font-semibold text-2xl'
          onClick={() => handleModal(setOpenModalNewClient, openModalNewClient)}
        >
          +
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              e.preventDefault();
              return form.handleSubmit(onSubmit)(e);
            }}
            className='space-y-8'
          >
            <AlertDialogHeader>
              <AlertDialogTitle className='text-blueTestDark text-center'>
                Add new Client
              </AlertDialogTitle>
              <AlertDialogDescription>
                <FormField
                  control={form.control}
                  name={`clientName`}
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Jhon Doe'
                          className='bg-accent'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='flex sm:!justify-center '>
              <AlertDialogCancel className='sm:ms-2 font-semibold'>
                Cancel
              </AlertDialogCancel>
              <button
                type='submit'
                className='bg-blueTest font-semibold hover:bg-blueTest text-white px-4'
              >
                Add Client
              </button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
