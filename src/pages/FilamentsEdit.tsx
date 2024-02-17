import { saveFilament, type Filament } from "../redux/filamentsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { useLayoutEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Section from "../components/Section";

const FilamentsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const filaments = useAppSelector((state) => state.filaments.value);

  const [filament, setFilament] = useState<Filament>(
    (id && filaments[id]) || { id: "", name: "", price: 0 },
  );

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveFilament(filament));
    navigate("/filaments");
  };

  useLayoutEffect(() => {
    document.getElementById("filamentName")?.focus();
  }, []);

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb
          pages={[
            { name: "Filaments", to: "/filaments" },
            { name: filament.id ? filament.name : "Add a filament" },
          ]}
        />
      </div>
      <form
        onSubmit={save}
        className="flex flex-col gap-5 lg:flex-row lg:items-center"
      >
        <label htmlFor="filamentName">Name</label>
        <input
          id="filamentName"
          name="filamentName"
          type="text"
          value={filament.name}
          onChange={(e) => setFilament({ ...filament, name: e.target.value })}
          required
          className="lg:grow"
        />

        <label htmlFor="price">Price ($/kg)</label>
        <input
          id="price"
          name="price"
          type="number"
          value={filament.price}
          onChange={(e) =>
            setFilament({ ...filament, price: Number(e.target.value) })
          }
          step={0.01}
          min={0}
          required
          className="lg:w-32"
        />

        <div className="flex justify-between gap-x-5">
          <button className="btn btn-primary grow" type="submit">
            Save
          </button>

          <Link className="btn btn-secondary" type="reset" to="/filaments">
            Cancel
          </Link>
        </div>
      </form>
    </Section>
  );
};

export default FilamentsEdit;
