import { PropsWithChildren } from 'react'
import { MagnifyingGlassIcon } from './Icons'

type EmptyResultProps = {
  title: string
  text?: string
}

const EmptyResult = ({
  title,
  text = 'Get started by adding one above',
  children,
}: PropsWithChildren<EmptyResultProps>) => {
  return (
    <div className="mt-6 flex h-96 items-center rounded-lg border text-center dark:border-gray-700">
      <div className="mx-auto flex w-full max-w-sm flex-col px-4">
        <div className="mx-auto rounded-full bg-blue-100 p-3 text-blue-500 dark:bg-gray-800">
          <MagnifyingGlassIcon />
        </div>
        <h1 className="mt-3 text-lg text-gray-800 dark:text-white">{title}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{text}</p>
        <div className="mx-auto mt-4 flex items-center gap-x-3">{children}</div>
      </div>
    </div>
  )
}

export default EmptyResult
