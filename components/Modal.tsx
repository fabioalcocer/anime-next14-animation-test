'use client'
import {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
} from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { MotionDiv } from './MotionDiv'

export default function Modal({
  children,
}: {
  children: React.ReactNode
}) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (
        e.target === overlay.current ||
        e.target === wrapper.current
      ) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className='fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60'
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6'
      >
        <div
          className='absolute right-10 sm:right-16 top-10 ml-auto'
          onClick={onDismiss}
        >
          <Image
            src='/cross.svg'
            alt='logo'
            width={36}
            height={36}
            className='cursor-pointer'
          />
        </div>
        {children}
      </div>
    </div>
  )
}
