import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import EmptyResult from '../components/EmptyResult'
import { AddIcon } from '../components/Icons'
import Section from '../components/Section'
import { useAppSelector, usePrints, useResults } from '../hooks'

const Results = () => {
  const { prints } = usePrints()
  const general = useAppSelector((state) => state.general)

  const {
    weight,
    time,
    filamentCost,
    energyCost,
    totalPrint,
    failureCharge,
    totalCost,
    profit,
    price,
    transactionFee,
    finalPrice,
  } = useResults()

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb pages={[{ name: 'Results' }]} />
      </div>
      {prints.length === 0 ? (
        <EmptyResult
          title="No results yet"
          text="Go to the Prints tab or click the button below to add a print."
        >
          <Link to="/prints" className="btn btn-primary">
            <AddIcon />
            Add a print
          </Link>
        </EmptyResult>
      ) : (
        <div className="grid grid-cols-2 gap-y-2 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <div>Weight:</div>
          <div>{weight} g</div>

          <div>Time:</div>
          <div>{time} min</div>

          <div>Filament cost:</div>
          <div>$ {filamentCost.toFixed(2)}</div>

          {energyCost > 0 && (
            <>
              <div>Energy cost:</div>
              <div>$ {energyCost.toFixed(2)}</div>
            </>
          )}

          {totalPrint != filamentCost && (
            <>
              <div>Total print cost:</div>
              <div>$ {totalPrint.toFixed(2)}</div>
            </>
          )}

          {general.failureMargin > 0 && (
            <>
              <div>Failure charge ({general.failureMargin}%):</div>
              <div>$ {failureCharge.toFixed(2)}</div>
            </>
          )}

          {general.additionalCost > 0 && (
            <>
              <div>Additional charge:</div>
              <div>$ {general.additionalCost.toFixed(2)}</div>
            </>
          )}

          {totalCost != totalPrint && (
            <>
              <div>Total charge:</div>
              <div>$ {totalCost.toFixed(2)}</div>
            </>
          )}

          {general.markup > 0 && (
            <>
              <div>Profit ({general.markup}%):</div>
              <div>$ {profit.toFixed(2)}</div>
            </>
          )}

          {price != finalPrice && (
            <>
              <div>Sell price:</div>
              <div>$ {price.toFixed(2)}</div>
            </>
          )}

          {general.transactionFee > 0 && (
            <>
              <div>Transaction fee ({general.transactionFee}%):</div>
              <div>$ {transactionFee.toFixed(2)}</div>
            </>
          )}

          <div className="font-bold">Final price:</div>
          <div className="font-bold">$ {finalPrice.toFixed(2)}</div>
        </div>
      )}
    </Section>
  )
}

export default Results
