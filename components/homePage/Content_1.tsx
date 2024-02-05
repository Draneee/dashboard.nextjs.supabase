import Image from 'next/image';

const Content_1 = () => {
  return (
    <div className='py-24 w-full' id='content_1'>
      <div className='container flex flex-col w-full'>
        <div className='max-w-lg'>
          <h2 className='text-7xl font-extrabold text-blueTestDark mb-4'>
            Content 1
          </h2>
          <p className='text-graySoft mb-24 font-semibold'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
        <div className='grid grid-cols-4 gap-12'>
          {Array.from({ length: 4 }, (_, idx) => (
            <div className='hover:scale-105 transition' key={idx}>
              <div className='bg-blueTest aspect-square grid place-items-center mb-4'>
                <Image
                  src='/Image/placeholder.svg'
                  alt='Placeholder'
                  width={0}
                  height={0}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
              <p className='text-graySoft mb-24 font-semibold'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content_1;
