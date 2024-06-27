import RandomColorButton from '../components/RandomColorButton.js';

export default function Home() {
  return (
    <div className='h-screen flex flex-col mt-36'>
      <div className='grid grid-cols-2'>
        <div className='flex justify-center items-center font-semibold text-6xl'>
          <div>
          <h1 className='cursor-pointer drop-shadow-2xl text-[#282828] hover:text-[#002a87] transition-all duration-500'>
            Mark Li
          </h1>
          </div>
        </div>
        <div className='flex justify-center items-center bg-[#E6E4DD] p-20'>
          <div>
          <div className='flex justify-center items-center'>
            <h1 className='font-bold text-2xl mb-4'>About Me</h1>
          </div>
            <p>
            Hey! I'm a senior at Northwestern University studying computer science and music. I just made this website as a small project and a place to put my music. Hopefully in the future I can put other projects up on here too.
            </p>
            <p className='flex justify-start'>
              -
            </p>
            <p>
              Meanwhile, here's a button that changes colors when you click on it :D
            </p>
            <div className='flex justify-center mt-4'>
              <RandomColorButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
