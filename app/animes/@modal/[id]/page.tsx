import { fetchAnimeById } from '@/app/action'
import Image from 'next/image'
import { Suspense } from 'react'

type PageProps = {
  params: {
    id: number
  }
}

type Props = {
  id: number
}

async function Anime({ id }: Props) {
  const anime = await fetchAnimeById(id)

  return (
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[70%] h-[70vh] z-50 bg-red-400 margin-auto'>
      <div>{anime.name}</div>
      <div className='relative w-full h-full'>
        <Image
          src={
            `https://shikimori.one${anime?.screenshots[0]?.original}` ||
            ''
          }
          alt={anime.name}
          fill
          className='rounded-xl object-contain'
        />
      </div>
    </div>
  )
}

function Page({ params: { id } }: PageProps) {
  return (
    <Suspense>
      <Anime id={id} />
    </Suspense>
  )
}

export default Page
