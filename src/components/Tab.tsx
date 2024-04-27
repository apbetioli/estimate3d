import { Link, To, useLocation } from 'react-router-dom'

import { PropsWithChildren } from 'react'
import classnames from 'classnames'

type TabProps = {
  to: To
  onClick?: () => void
}

const Tab = ({ to, onClick, children }: PropsWithChildren<TabProps>) => {
  const { pathname } = useLocation()
  const active =
    pathname == to || (String(to) !== '/' && pathname.startsWith(String(to)))
  return (
    <Link
      to={to}
      onClick={onClick}
      className={classnames(
        'items-center whitespace-nowrap px-12 py-3 text-center text-sm text-gray-700 focus:outline-none dark:border-gray-500 dark:text-white sm:text-base md:border-gray-300 md:px-4',
        {
          'rounded-md font-bold md:rounded-none md:rounded-t-md md:border md:border-b-0 md:bg-transparent md:font-normal':
            active,
          'cursor-base bg-transparent hover:border-gray-400 dark:hover:border-gray-300 md:border-b':
            !active,
        },
      )}
    >
      {children}
    </Link>
  )
}

export default Tab
