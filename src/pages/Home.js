import RandomColorButton from '../components/RandomColorButton.js';

export default function Home() {
  return (
    <div className='h-screen flex flex-col'>
      <div className='flex-grow grid grid-cols-2'>
        <div className='flex justify-center items-center font-semibold text-6xl'>
          <h1 className='cursor-pointer drop-shadow-2xl text-[#282828] hover:text-blue-500 transition-all duration-500'>
            Hello, I'm Mark
          </h1>
        </div>
        <div className='flex justify-center items-center bg-[#E6E4DD] p-10'>
          <div>
          <div className='flex justify-center items-center'>
            <h1 className='font-bold text-xl mb-4'>About Me</h1>
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
