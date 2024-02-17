import { Link } from "react-router-dom";

type Page = {
  name: string;
  to?: string;
};

type BreadcrumbProps = {
  pages: Page[];
};

const Breadcrumb = ({ pages }: BreadcrumbProps) => {
  return (
    <div className="container mx-auto flex items-center overflow-x-auto whitespace-nowrap font-bold  text-gray-600 dark:text-gray-200">
      {pages.map((page, index) => (
        <div key={page.name} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}

          {page.to ? (
            <Link to={page.to} className="hover:underline">
              {page.name}
            </Link>
          ) : (
            page.name
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
