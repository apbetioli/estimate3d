import { useState } from "react";

type SectionProps = {
  title: string;
  collapsable?: boolean;
  children?: any;
};

const Section = ({ collapsable = true, title, children }: SectionProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="my-10 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      {collapsable ? (
        <button
          className="text-xl font-bold mb-3"
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
