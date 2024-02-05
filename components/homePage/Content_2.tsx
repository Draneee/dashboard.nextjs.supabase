import Image from 'next/image';
import BlockColor from './BlockColor';

const Content_2 = () => {
  return (
    <div className='py-24 w-full bg-[#E8F3FE]' id='content_2'>
      <div className='container flex flex-col w-full items-end'>
        <div className='flex justify-end w-full'>
          <div className='flex justify-center w-full'>
            <Image
              src='/custom-svg/clouds.svg'
              alt='clouds'
              width={0}
              height={0}
              style={{ width: 'auto', height: '80px' }}
            />
          </div>
          <div className='max-w-lg text-right'>
            <h2 className='text-7xl font-extrabold text-blueTestDark mb-4'>
              Content 2
            </h2>
            <p className='text-graySoft mb-24 font-semibold'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-12 w-full'>
          {Array.from({ length: 3 }, (_, idx) => (
            <div
              key={idx}
              className='group flex flex-col gap-4 hover:scale-105 transition h-[40rem] border-4 border-white hover:border-blueTest w-full px-12 py-8'
            >
              <BlockColor className='min-h-8 mb-8' />
              {Array.from({ length: 12 }, (_, idx) => (
                <BlockColor key={idx} />
              ))}
              <BlockColor className='min-h-12 mt-8' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content_2;
