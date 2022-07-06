import classNames from 'classnames'
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        {...props}
        className={classNames(props.className, 'border border-gray-700 px-2')}
        ref={ref}
      >
        toBlobURL
      </button>
    )
  }
)

export default Button
