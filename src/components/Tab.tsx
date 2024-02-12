import { Link, To, useLocation } from "react-router-dom";

import { PropsWithChildren } from "react";
import classnames from "classnames";

type TabProps = {
  to: To;
};

const Tab = ({ to, children }: PropsWithChildren<TabProps>) => {
  const { pathname } = useLocation();
  const active = to === pathname;
  return (
    <Link
      to={to}
      className={classnames(
        "inline-flex h-12 items-center whitespace-nowrap border-gray-300 px-4 py-2 text-center  text-sm text-gray-700 focus:outline-none dark:border-gray-500 dark:text-white sm:text-base",
        {
          "rounded-t-md border border-b-0": active,
          "cursor-base border-b bg-transparent hover:border-gray-400 dark:hover:border-gray-300":
            !active,
        },
      )}
    >
      {children}
    </Link>
  );
};

export default Tab;
