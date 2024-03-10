import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';

type Page = {
  name: string;
  to?: string;
};

type BreadcrumbProps = {
  pages: Page[];
};

const Breadcrumb = ({ pages }: BreadcrumbProps) => {
  return (
    <div className="container mx-auto flex items-center overflow-x-auto whitespace-nowrap font-bold text-gray-600 dark:text-gray-200">
      {pages.map((page, index) => (
        <div key={page.name} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
              <ArrowRightIcon />
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
