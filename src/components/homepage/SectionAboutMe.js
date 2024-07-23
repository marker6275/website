import { RandomColorButton } from '../misc';

export function SectionAboutMe() {
  return (
    <div className='flex flex-col my-36'>
      <div className='grid grid-cols-2'>
        <div className='flex justify-center items-center font-semibold text-6xl'>
          <h1 className='cursor-pointer drop-shadow-2xl text-[#282828] hover:text-[#002a87] transition-all duration-500'>
            Mark Li
          </h1>
        </div>
        <div className='flex justify-center items-center bg-[#D3D6D2] p-20'>
          <div>
            <div className='flex justify-center items-center'>
              <h1 className='font-medium text-2xl mb-4'>About Me</h1>
            </div>
            <p>
              Hey! I'm a senior at Northwestern University studying computer science and music. I just made this website as a small project and a place to put my music. I'm hoping to be able to update this with other things as well.
            </p>
            <p className='flex justify-start'>
              -
            </p>
            <p>
              Meanwhile, here's a button that changes colors when you click on it :D
            </p>
            <div className='flex justify-center mt-4'>
              <RandomColorButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
