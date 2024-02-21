import { Link, To, useLocation } from "react-router-dom";

import { PropsWithChildren } from "react";
import classnames from "classnames";

type TabProps = {
  to: To;
};

const Tab = ({ to, children }: PropsWithChildren<TabProps>) => {
  const { pathname } = useLocation();
  const active =
    pathname == to || (String(to) !== "/" && pathname.startsWith(String(to)));
  return (
    <Link
      to={to}
      className={classnames(
        "inline-flex h-12 items-center whitespace-nowrap px-4 py-2 text-center text-sm text-gray-700 focus:outline-none dark:border-gray-500 dark:text-white sm:text-base md:border-gray-300",
        {
          "rounded-md md:rounded-none font-bold md:font-normal md:rounded-t-md md:border md:border-b-0 md:bg-transparent":
            active,
          "cursor-base bg-transparent hover:border-gray-400 dark:hover:border-gray-300 md:border-b":
            !active,
        },
      )}
    >
      {children}
    </Link>
  );
};

export default Tab;
