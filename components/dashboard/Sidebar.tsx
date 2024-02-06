'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from 'next/navigation';
const data = [
  {
    pathIcon: 'home.svg',
    pathUrl: '/admin/dashboard',
  },
  {
    pathIcon: 'sales-history.svg',
    pathUrl: '/admin/dashboard/SalesHistory',
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <aside className='bg-blueTest flex flex-col justify-between py-12'>
      <ul>
        {data.map((itm, idx) => (
          <li
            key={idx}
            className={`w-16 h-16  hover:bg-[#0073BE]/20 transition ${
              pathname === itm.pathUrl
                ? 'bg-[#0073BE] hover:!bg-[#0073BE]/90'
                : ''
            }`}
          >
            <Link
              href={itm.pathUrl}
              className='w-full h-full grid place-items-center'
            >
              <Image
                src={`/custom-svg/${itm.pathIcon}`}
                alt='Icon'
                width={0}
                height={0}
                className='h-5 w-5'
              />
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className='grid place-items-center'>
        <Image
          src='/custom-svg/exit.svg'
          alt='Icon'
          width={0}
          height={0}
          className='h-6 w-6 invert'
        />
      </button>
    </aside>
  );
}
