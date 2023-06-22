import { HTMLInputTypeAttribute } from 'react'

type InputType = {
  id: string,
  name: string,
  type: HTMLInputTypeAttribute,
  val: string,
  setVal: (value: string) => void,
  required?: boolean,
  label?: string,
}

export const inputClassNames = [
  'w-full',
  'px-3',
  'py-2',
  'border-0',
  'border-b',
  'border-color-form-border',
  'bg-form-background',
  'placeholder-form-textSecondary',
  'focus:outline-none',
  'focus:ring-0',
  'focus:border-form-borderSelected',
  'focus:bg-form-backgroundActive',
  'text-sm',
].join(' ')

export const inputErrorClassNames = [
  'text-form-textError',
  'text-sm',
  'appearance-none',
].join(' ')

export const Input = ({ id, name, type, val, setVal, required = false, label }: InputType) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-form-secondary">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={type}
          required={required}
          className={inputClassNames}
          value={val}
          onChange={(e) => {
            setVal(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
