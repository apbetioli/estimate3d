import { PropsWithChildren, useState } from "react";

type SectionProps = {
  title: string;
  collapsable?: boolean;
};

const Section = ({
  collapsable = true,
  title,
  children,
}: PropsWithChildren<SectionProps>) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="my-10 rounded-lg bg-white px-8 py-4 shadow-md dark:bg-gray-800">
      {collapsable ? (
        <button
          className="mb-3 text-xl font-bold"
          onClick={() => setCollapsed(!collapsed)}
        >
          {title}
        </button>
      ) : (
        <h2>{title}</h2>
      )}
      {!collapsed && children}
    </section>
  );
};

export default Section;
