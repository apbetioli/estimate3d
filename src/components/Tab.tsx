import { Link, To, useLocation } from "react-router-dom";

import classnames from "classnames";

type TabProps = {
  to: To;
  children?: any;
};

const Tab = (props: TabProps) => {
  const { pathname } = useLocation();
  const active = props.to === pathname;
  return (
    <Link
      to={props.to}
      className={classnames(
        "inline-flex h-12 items-center whitespace-nowrap border-gray-300 px-4 py-2 text-center  text-sm text-gray-700 focus:outline-none dark:border-gray-500 dark:text-white sm:text-base",
        {
          "rounded-t-md border border-b-0": active,
          "cursor-base border-b bg-transparent hover:border-gray-400 dark:hover:border-gray-300":
            !active,
        },
      )}
    >
      {props.children}
    </Link>
  );
};

export default Tab;
