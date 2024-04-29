import Breadcrumb from '../components/Breadcrumb'
import Section from '../components/Section'
import {
  setAdditionalCost,
  setEnergyCost,
  setFailureMargin,
  setMarkup,
  setTransactionFee,
} from '../features/generalSlice'
import { useAppDispatch, useAppSelector } from '../hooks'

const General = () => {
  const { energyCost, failureMargin, markup, transactionFee, additionalCost } =
    useAppSelector((state) => state.general)
  const dispatch = useAppDispatch()

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb pages={[{ name: 'General' }]} />
      </div>
      <form className="flex flex-col gap-y-5">
        <div>
          <label htmlFor="energy">Energy cost (kW/h)</label>
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            This information is usually available in your energy bill.
          </p>
          <input
            id="energy"
            name="energy"
            type="number"
            value={energyCost}
            onChange={(e) => dispatch(setEnergyCost(Number(e.target.value)))}
            step={0.01}
            min={0}
          />
        </div>

        <div>
          <label htmlFor="markup">Markup (%)</label>
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            The percentage of profit over the final cost.
          </p>
          <input
            id="markup"
            name="markup"
            type="number"
            value={markup}
            onChange={(e) => dispatch(setMarkup(Number(e.target.value)))}
            step={1}
            min={0}
            max={100}
          />
        </div>
        <div>
          <label htmlFor="failureMargin">Failure margin (%)</label>
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            Prints fail! This is a fact. If yours fail often you can give a
            failure margin to cover this cost.
          </p>
          <input
            id="failureMargin"
            name="failureMargin"
            type="number"
            value={failureMargin}
            onChange={(e) => dispatch(setFailureMargin(Number(e.target.value)))}
            step={1}
            min={0}
            max={100}
          />
        </div>
        <div>
          <label htmlFor="transactionFee">Transaction fee (%)</label>
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            The percentage of the transaction fee charged by the payment gateway
            to be added to the final price.
          </p>
          <input
            id="transactionFee"
            name="transactionFee"
            type="number"
            value={transactionFee}
            onChange={(e) =>
              dispatch(setTransactionFee(Number(e.target.value)))
            }
            step={1}
            min={0}
            max={100}
          />
        </div>
        <div>
          <label htmlFor="additionalCost">Additional charge ($)</label>
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            Any additional charge, e.g. ROI, maintenance, shipping, etc.
          </p>
          <input
            id="additionalCost"
            name="additionalCost"
            type="number"
            value={additionalCost}
            onChange={(e) =>
              dispatch(setAdditionalCost(Number(e.target.value)))
            }
            step={0.01}
            min={0}
          />
        </div>
      </form>
    </Section>
  )
}

export default General
