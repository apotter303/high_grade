import clsx from 'clsx'

type ContainerProps<T extends React.ElementType> = {
  as?: T
  className?: string
  children: React.ReactNode
}

export function Container<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>> &
  ContainerProps<T>) {
  let Component = as ?? 'div'

  return (
    <Component className={clsx('mx-auto max-w-7xl', className)}>
      <div className={clsx(
        'mx-auto max-w-2xl lg:max-w-none', 
        className?.includes('px-0') ? 'px-0' : 'px-6 lg:px-8'
      )}>
        {children}
      </div>
    </Component>
  )
}
