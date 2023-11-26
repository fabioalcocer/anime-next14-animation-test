import { fetchAnimeById } from '@/app/action'
import { Suspense } from 'react'

export interface Params {
  [param: string]: any
}

type Props = {
  id: number
}

async function Anime({ id }: Props) {
  const data = await fetchAnimeById(id)

  return (
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-50 bg-red-400 margin-auto'>
      <h1>Todo funciona {id}</h1>
      <div>{data.name}</div>
    </div>
  )
}

async function Page({ params }: Params) {
  const { id } = params

  return (
    <Suspense>
      <Anime id={id} />
    </Suspense>
  )
}

export default Page
