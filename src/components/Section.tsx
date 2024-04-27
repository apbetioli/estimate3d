import { PropsWithChildren } from 'react'

const Section = ({ children }: PropsWithChildren) => {
  return (
    <section className="rounded-lg bg-white px-8 py-4 shadow-md dark:bg-gray-900">
      {children}
    </section>
  )
}

export default Section
