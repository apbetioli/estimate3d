import Section from "../components/Section";
import { persistor } from "../redux/store";
import { useState } from "react";

const Settings = () => {
  const [message, setMessage] = useState("");
  return (
    <Section title="Settings">
      <div className="flex flex-col gap-y-5">
        <div className="rounded-lg border border-red-600 p-5">
          <label htmlFor="energy" className="font-bold text-red-500">
            Delete all data
          </label>
          <p className="text-sm text-red-500">
            This will erase all your saved data.
          </p>
          <button
            className="btn btn-danger mt-5"
            onClick={() => {
              persistor
                .purge()
                .then(() => {
                  setMessage("All your data was erased!");
                  setTimeout(() => {
                    setMessage("");
                  }, 3000);
                })
                .catch((err) => {
                  setMessage(
                    "An error occurred. Check the console for details.",
                  );
                  console.error(err);
                });
            }}
          >
            Delete all
          </button>
          {message && <p className="mt-5">{message}</p>}
        </div>
      </div>
    </Section>
  );
};

export default Settings;
