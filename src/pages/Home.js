import RandomColorButton from '../components/RandomColorButton.js';

export default function Home() {
  return ( 
    <div className='bg-[#EBE8E2] h-screen flex flex-col'>
        <div className='flex-grow grid grid-cols-2'>
          {/* left */}
          <div className='flex justify-center items-center font-semibold text-6xl'>
            <h1 className='cursor-pointer drop-shadow-2xl text-black hover:text-blue-600 transition-all duration-500'>  
              Hello, I'm Mark
            </h1>
          </div>
          {/* right */}
          <div className='flex justify-center items-center bg-[#D2D3D6] p-10'>
            <div>
              <div className='flex justify-center items-center'>
                <h1 className='font-bold text-xl mb-4'>About Me</h1>
              </div>
              <p>
                Hey! I'm a junior at Northwestern University studying computer science and music.
              </p>
              <p className='flex justify-start'>
                -
              </p>
              <p>
                I just made this website as a small project and a place to put my music.
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
