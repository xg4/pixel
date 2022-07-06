import classNames from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  children: ReactNode
}

export default function Card({ title, children, ...restProps }: CardProps) {
  return (
    <div {...restProps} className={classNames(restProps.className, 'p-12')}>
      <div className="border bg-white/70 border-gray-900 shadow-xl space-y-8 p-10">
        <div className="text-gray-700 text-center font-bold text-xl">
          {title}
        </div>
        {children}
      </div>
    </div>
  )
}
