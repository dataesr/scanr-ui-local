import { forwardRef } from 'react';
import cn, { Argument } from 'classnames';
import { OnlyAs, PolyRefFunction } from 'react-polymorphed';

const polyRef = forwardRef as PolyRefFunction;

type ContainerProps = React.PropsWithChildren<{
  fluid?: boolean;
  fluidFrom?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: Argument;
}>

export const Container = polyRef<'div', ContainerProps, OnlyAs<'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav' | 'section' | 'div'>>(({
  as: HTMLTag = 'div',
  className,
  fluid = false,
  fluidFrom = "xs",
  ...props
}, ref) => {
  const _classes = cn({
    'fr-container': !fluid,
    'fr-container-fluid': (fluid || !(fluidFrom !== 'xs')),
    [`fr-container-${fluidFrom}--fluid`]: (!fluid && fluidFrom !== 'xs')
  }, className);
  return (
    <HTMLTag
      className={_classes}
      ref={ref}
      {...props}
    />
  );
});