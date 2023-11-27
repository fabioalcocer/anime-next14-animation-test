import { fetchAnimeById } from '@/app/action'
import Modal from '@/components/Modal'
import Image from 'next/image'
import { Suspense } from 'react'

type PageProps = {
  params: {
    id: number
  }
}

async function Anime({ id }: { id: number }) {
  const anime = await fetchAnimeById(id)

  const videoUrl = anime.videos[0]?.player_url as string
  const validVideoUrl = videoUrl.replace('http', 'https') || ''

  return (
    <div className='h-auto flex flex-col bg-[#1a1e27] p-6 px-4 md:px-10 text-slate-200 rounded-xl'>
      <div className='flex flex-wrap max-w-[90%] items-center'>
        <h3 className='text-3xl text-white font-bold mr-4'>
          {anime.name}
        </h3>
        <p className='pt-1 text-[#FFAD49] text-lg'>
          ( {anime.japanese} )
        </p>
      </div>
      <div className='mt-2 flex items-center gap-4'>
        <p className='text-[#FFAD49]'>{anime.studios[0].name}</p>
        <p className='text-sm '>{anime.released_on}</p>
      </div>
      <p className='line-clamp-3 h-auto my-4'>{anime.description}</p>
      <div className='flex gap-4 items-center'>
        <div className='flex flex-row gap-2 items-center'>
          <Image
            src='/episodes.svg'
            alt='episodes'
            width={20}
            height={20}
            className='object-contain'
          />
          <p className='text-base text-white font-bold'>
            {anime.episodes || anime.episodes_aired}
          </p>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <Image
            src='/star.svg'
            alt='star'
            width={18}
            height={18}
            className='object-contain'
          />
          <p className='text-base font-bold text-[#FFAD49]'>
            {anime.score}
          </p>
        </div>
      </div>

      <div className='w-full relative mt-5 mb-2 h-80 rounded-lg overflow-hidden'>
        <iframe
          title={anime.name}
          className='w-full h-full'
          src={validVideoUrl}
          allowFullScreen
        />
      </div>
    </div>
  )
}

function Page({ params: { id } }: PageProps) {
  return (
    <Modal>
      <Suspense
        fallback={
          <div className='h-auto flex flex-col bg-[#1a1e27] p-6 px-4 md:px-10 text-slate-200 rounded-xl'>
            <h1>Loading...</h1>
          </div>
        }
      >
        <Anime id={id} />
      </Suspense>
    </Modal>
  )
}

export default Page
