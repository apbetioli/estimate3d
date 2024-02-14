import { PropsWithChildren } from "react";

type SectionProps = {
  title: string;
};

const Section = ({ title, children }: PropsWithChildren<SectionProps>) => {
  return (
    <section className="my-10 rounded-lg bg-white px-8 py-4 shadow-md dark:bg-gray-900">
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Section;
