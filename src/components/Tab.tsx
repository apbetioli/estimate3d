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
        "inline-flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700  border-gray-300 sm:text-base dark:border-gray-500 dark:text-white whitespace-nowrap focus:outline-none",
        {
          "border border-b-0 rounded-t-md": active,
          "bg-transparent border-b cursor-base hover:border-gray-400 dark:hover:border-gray-300":
            !active,
        },
      )}
    >
      {props.children}
    </Link>
  );
};

export default Tab;
