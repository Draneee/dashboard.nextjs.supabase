'use client';

import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { redirect, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const dashboardPath = '/admin/dashboard';
  const supabase = createClientComponentClient();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e);
  };
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }

    getUser();
  }, []);

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setUser(res.data.user);
    router.refresh();
    setEmail('');
    setPassword('');
  };

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(res);
    router.push(dashboardPath);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  console.log({ user });

  // if (user) {
  //   router.push(dashboardPath);
  // }

  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <main className='h-screen flex items-center justify-center bg-gray-800 p-6'>
      <button type='button' onClick={handleClick}>
        {likes}
      </button>
      <div className='bg-gray-900 p-8 rounded-lg shadow-md w-96'>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className='mb-4 w-full p-3  border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500'
          />
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='mb-4 w-full p-3  border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500'
          />
        </form>
        <button
          onClick={handleSignUp}
          className='w-full mb-2 p-3  bg-blue-600 text-white hover:bg-blue-700 focus:outline-none'
        >
          Sign Up
        </button>
        <button
          onClick={handleSignIn}
          className='w-full p-3  bg-gray-700 text-white hover:bg-gray-600 focus:outline-none'
        >
          Sign In
        </button>
      </div>
    </main>
  );
}
