import clsx from 'clsx';
import type { CSSProperties, FC, JSX, PropsWithChildren } from 'react';

export type HeadingComponentProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
};
export const HeadingComponent: FC<PropsWithChildren<HeadingComponentProps>> = ({
  as = 'h1',
  className,
  style,
  children,
}) => {
  const Component = as;
  return (
    <Component className={clsx('text-3xl mb-4', className)} style={style}>
      {children}
    </Component>
  );
};
