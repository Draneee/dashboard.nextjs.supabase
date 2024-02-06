'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { useRouter } from 'next/router';
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
  console.log(pathname);

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
      <button></button>
    </aside>
  );
}
