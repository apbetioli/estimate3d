import Section from "../components/Section";
import { persistor } from "../redux/store";
import { useState } from "react";

const Settings = () => {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <Section title="Settings">
      <div className="flex flex-col gap-y-5">
        <div className="rounded-lg border border-red-600 p-5">
          <label htmlFor="energy" className="font-bold text-red-500">
            Delete all data
          </label>
          <p className="field-description text-red-500">
            This will erase all your saved data.
          </p>
          <button
            className="btn btn-danger mt-5"
            onClick={() => {
              persistor
                .purge()
                .then(() => {
                  setShowMessage(true);
                  setTimeout(() => {
                    setShowMessage(false);
                  }, 3000);
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            Delete all
          </button>
          {showMessage && <p className="mt-5">All your data was erased!</p>}
        </div>
      </div>
    </Section>
  );
};

export default Settings;
