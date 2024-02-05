import Image from 'next/image';

const data = [
  {
    path: 'home.svg',
  },
];
export default function Sidebar() {
  return (
    <aside className='bg-blueTest flex flex-col justify-between py-12'>
      <ul>
        {data.map((itm, idx) => (
          <li
            key={idx}
            className='w-16 h-16 grid place-items-center hover:bg-[#0073BE] transition'
          >
            <Image
              src={`/custom-svg/${itm.path}`}
              alt='Icon'
              width={0}
              height={0}
              className='h-5 w-5'
            />
          </li>
        ))}
      </ul>
      <button>log</button>
    </aside>
  );
}
