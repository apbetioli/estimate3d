type EmptyResultProps = {
  title: string;
  text?: string;
  children?: any;
};

const EmptyResult = ({
  title,
  text = "Get started by adding one above",
  children,
}: EmptyResultProps) => {
  return (
    <div className="mt-6 flex h-96 items-center rounded-lg border text-center dark:border-gray-700">
      <div className="mx-auto flex w-full max-w-sm flex-col px-4">
        <div className="mx-auto rounded-full bg-blue-100 p-3 text-blue-500 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <h1 className="mt-3 text-lg text-gray-800 dark:text-white">{title}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{text}</p>
        <div className="mt-4 flex items-center gap-x-3 sm:mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default EmptyResult;
