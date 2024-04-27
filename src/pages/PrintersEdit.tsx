import { usePrinters } from '../redux/hooks'

import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import Section from '../components/Section'

const PrintersEdit = () => {
  const navigate = useNavigate()
  const { findById, save } = usePrinters()
  const { id } = useParams()
  const nameInput = useRef<HTMLInputElement>(null)
  const printer = findById(id!)
  const [name, setName] = useState(printer?.name || '')
  const [power, setPower] = useState(printer?.power || 0)

  const onSave = (e: React.FormEvent) => {
    e.preventDefault()
    save({
      id: printer?.id,
      name,
      power,
    })
    navigate('/printers')
  }

  useEffect(() => {
    nameInput.current?.focus()
  }, [])

  return (
    <Section>
      <div className="my-5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gray-100 pl-4 dark:bg-gray-800">
        <Breadcrumb
          pages={[
            { name: 'Printers', to: '/printers' },
            { name: printer?.id ? 'Edit printer' : 'Add a printer' },
          ]}
        />
      </div>
      <form
        onSubmit={onSave}
        className="flex flex-col gap-5 lg:flex-row lg:items-center"
      >
        <label htmlFor="printerName">Name</label>
        <input
          id="printerName"
          name="printerName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="lg:grow"
          ref={nameInput}
        />

        <label htmlFor="power">Power consumption (W)</label>
        <input
          id="power"
          name="power"
          type="number"
          value={power}
          onChange={(e) => setPower(Number(e.target.value))}
          step={0.01}
          min={0}
          required
          className="lg:w-32"
        />

        <div className="flex justify-between gap-x-5">
          <button className="btn btn-primary grow" type="submit">
            Save
          </button>

          <Link to="/printers" className="btn btn-secondary" type="reset">
            Cancel
          </Link>
        </div>
      </form>
    </Section>
  )
}

export default PrintersEdit
