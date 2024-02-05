import Image from 'next/image';
import Link from 'next/link';
const Hero = () => {
  return (
    <div className='relative w-full h-[100dvh]'>
      <div className='absolute h-full w-full flex justify-end -z-10'>
        <Image
          src='/custom-svg/image.hero.svg'
          alt='hola'
          width={0}
          height={0}
          sizes='100vh'
          style={{ width: 'auto', height: '100%' }}
        />
      </div>

      <div className='container h-full relative z-10 pt-8'>
        <div className='h-full w-full flex '>
          <div className='flex flex-col justify-center max-w-lg'>
            <h1 className='text-7xl font-extrabold text-blueTestDark mb-4'>
              Lorem ipsum Design
            </h1>
            <p className='text-graySoft mb-24 font-semibold'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
              totam. Debitis quas necessitatibus labore praesentium magni sunt
              corrupti exercitationem
            </p>
            <Link
              href={'/admin'}
              className='bg-blueTest w-fit text-white font-bold text-lg px-8 py-3 hover:scale-105 transition'
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
