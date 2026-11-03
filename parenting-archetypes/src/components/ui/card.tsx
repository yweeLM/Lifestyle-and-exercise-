import * as React from 'react'
import { cn } from '../../lib/utils'

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-[14px] border border-border bg-card p-5 shadow-[var(--shadow)]', className)}
      {...props}
    />
  )
}
