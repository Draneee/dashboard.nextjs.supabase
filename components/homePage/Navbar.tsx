import Link from 'next/link';

const data = [
  {
    label: 'Content 1',
    id: 'content_1',
  },
  {
    label: 'Content 2',
    id: 'content_2',
  },
];

const Navbar = () => {
  return (
    <nav className='container flex gap-8 justify-end pt-8 absolute z-20'>
      <ul className='flex font-semibold gap-6'>
        {data.map((itm) => (
          <li key={itm.id} className='hover:scale-105 transition'>
            <Link href={`#${itm.id}`}>{itm.label}</Link>
          </li>
        ))}
      </ul>
      <Link
        className='text-blueTest font-bold hover:scale-105 transition'
        href={'/admin'}
      >
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
