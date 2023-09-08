import RandomColorButton from '../components/RandomColorButton.js';

export default function Home() {
  return (
    <div className='bg-[#EBE8E2] h-screen flex flex-col font-inter'>
      <div className='flex-grow grid grid-cols-2'>
        <h1 className='flex justify-center items-center font-semibold text-6xl'>
          Hello, I'm Mark
        </h1>
        <div className='flex justify-center items-center bg-[#E6E4DD] p-10'>
          <div>
          <div className='flex justify-center items-center'>
            <h1 className='font-bold text-xl mb-4'>About Me</h1>
          </div>
            <p>
              Hey! I'm a junior at Northwestern University studying computer science and music. I am a percussionist and I play piano as well.
            </p>
            <p className='flex justify-start'>
              -
            </p>
            <p>
              I just made this website as a small project and a place to put my music. Hopefully in the future I can put my code and other projects up on here too.
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
