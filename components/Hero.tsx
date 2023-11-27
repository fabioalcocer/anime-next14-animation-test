import Image from 'next/image'
import { MotionDiv } from './MotionDiv'

function Hero() {
  return (
    <header className='bg-hero bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0'>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ ease: 'linear', duration: 0.3 }}
        viewport={{ amount: 0 }}
        className='flex-1 flex flex-col gap-10'
      >
        <div className='flex-1 flex flex-col gap-10'>
          <Image
            src='/logo.svg'
            alt='logo'
            width={101}
            height={96}
            className='object-contain'
          />
          <h1 className='sm:text-6xl text-5xl text-white lg:max-w-lg font-bold leading-[120%]'>
            Explore The{' '}
            <span className='red-gradient'>Amazing Stories</span> of
            Anime Magic
          </h1>
        </div>
      </MotionDiv>
      <div className='lg:flex-1 relative w-full h-[50vh] justify-center'>
        <Image
          src='/anime.webp'
          alt='anime'
          fill
          className='object-contain'
        />
      </div>
    </header>
  )
}

export default Hero
