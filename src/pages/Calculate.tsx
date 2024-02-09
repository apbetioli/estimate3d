import EmptyResult from "../components/EmptyResult";
import Section from "../components/Section";

const Calculate = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div>
      <Section title="Add a part" collapsable>
        <form onSubmit={onSubmit}>
          <label htmlFor="printer">Printer</label>
          <select id="printer" required />

          <label htmlFor="filament">Filament</label>
          <select id="filament" required />

          <label htmlFor="weight">Estimated weight (g)</label>
          <input id="weight" type="number" required step={1} min={0} />

          <label htmlFor="time">Estimated time (min)</label>
          <input id="time" type="number" required step={1} min={0} />

          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </Section>
      <Section title="Results">
        <EmptyResult title="No parts yet" />
      </Section>
    </div>
  );
};

export default Calculate;
