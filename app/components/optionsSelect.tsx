import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface IOption {
  name: string, value: any, selected: boolean, display: string
}

interface ISelectOptions {
    options: IOption[]
    onChange: React.Dispatch<React.SetStateAction<IOption[]>>
}

const OptionsSelect = ({ options, onChange }: ISelectOptions) => {
  const [opt, setOpt] = useState(options[0])
  const handleChange = (opt: IOption) => {
    setOpt(opt)
    onChange(options.map(o => ({ ...o, selected: o.value === opt.value })))
  }


  return (
    <div>
      <RadioGroup value={opt} onChange={handleChange} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                  checked
                    ? 'nm-inset-slate-900 border-2 border-separate border-sky-500 text-white'
                    : 'nm-convex-slate-900 text-white hover:nm-concave-slate-900 transition-all',
                  ' rounded-md py-3 px-9 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer'
                )
              }
            >
              <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default OptionsSelect;
