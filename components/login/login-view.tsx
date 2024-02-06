'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { loginSchema } from '@/lib/utils.admin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function LoginView() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);

    const res = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    console.log(res.error);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    form.reset();
    router.push('/admin/dashboard');
  }

  return (
    <main className='h-screen flex items-center justify-center bg-[#F6F7FA] p-6'>
      <div className='bg-[#DAE6F5]  p-8 rounded-lg shadow-md w-96'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Email@domain.com' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Password' type='password' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='bg-blueTest w-full hover:bg-blueTest font-semibold'
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
