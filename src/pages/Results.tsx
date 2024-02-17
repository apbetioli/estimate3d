import Breadcrumb from "../components/Breadcrumb";
import EmptyResult from "../components/EmptyResult";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import { useAppSelector } from "../redux/hooks";

const Results = () => {
  const prints = useAppSelector((state) => state.prints.value);
  const printers = useAppSelector((state) => state.printers.value);
  const filaments = useAppSelector((state) => state.filaments.value);
  const general = useAppSelector((state) => state.general);

  const findPrinter = (id: string) =>
    Object.values(printers).find((_p) => id === _p.id);
  const findFilament = (id: string) =>
    Object.values(filaments).find((_f) => id === _f.id);

  const printsResult = Object.values(prints)
    .map((print) => {
      const printer = findPrinter(print.printer) || { power: 0 };
      const filament = findFilament(print.filament) || { price: 0 };
      return {
        weight: print.weight,
        time: print.time,
        filamentCost: print.weight * (filament.price / 1000),
        energyCost:
          (print.time * printer.power * general.energyCost) / (60 * 1000),
      };
    })
    .reduce(
      (acc, curr) => {
        acc.weight += curr.weight;
        acc.time += curr.time;
        acc.energyCost += curr.energyCost;
        acc.filamentCost += curr.filamentCost;
        return acc;
      },
      {
        weight: 0,
        time: 0,
        filamentCost: 0,
        energyCost: 0,
      },
    );

  const totalPrint = printsResult.energyCost + printsResult.filamentCost;
  const failureCharge = (general.failureMargin / 100) * totalPrint;
  const totalCost = general.additionalCost + failureCharge + totalPrint;
  const profit = (general.markup / 100) * totalCost;
  const price = totalCost + profit;
  const transactionFee = (general.transactionFee / 100) * price;
  const finalPrice = price + transactionFee;

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb pages={[{ name: "Results" }]} />
      </div>
      {Object.values(prints).length === 0 ? (
        <EmptyResult
          title="No results yet"
          text="Go to the Prints tab or click the button below to add a print."
        >
          <Link to="/prints" className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Add a print
          </Link>
        </EmptyResult>
      ) : (
        <div className="grid grid-cols-2 gap-y-2">
          <div>Weight:</div>
          <div>{printsResult.weight} g</div>

          <div>Time:</div>
          <div>{printsResult.time} min</div>

          <div>Filament cost:</div>
          <div>$ {printsResult.filamentCost.toFixed(2)}</div>

          <div>Energy cost:</div>
          <div>$ {printsResult.energyCost.toFixed(2)}</div>

          <div>Total print cost:</div>
          <div>$ {totalPrint.toFixed(2)}</div>

          <div>Failure charge ({general.failureMargin}%):</div>
          <div>$ {failureCharge.toFixed(2)}</div>

          <div>Additional charge:</div>
          <div>$ {general.additionalCost.toFixed(2)}</div>

          <div>Total charge:</div>
          <div>$ {totalCost.toFixed(2)}</div>

          <div>Profit ({general.markup}%):</div>
          <div>$ {profit.toFixed(2)}</div>

          <div>Sell price:</div>
          <div>$ {price.toFixed(2)}</div>

          <div>Transaction fee ({general.transactionFee}%):</div>
          <div>$ {transactionFee.toFixed(2)}</div>

          <div className="font-bold">Final price:</div>
          <div className="font-bold">$ {finalPrice.toFixed(2)}</div>
        </div>
      )}
    </Section>
  );
};

export default Results;
