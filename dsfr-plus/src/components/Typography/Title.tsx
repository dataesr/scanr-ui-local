import cn, { Argument } from 'classnames';
import { OnlyAs, PolymorphicComponent } from 'react-polymorphed';

type TitleTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TitleDisplay = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Look = TitleTags | TitleDisplay;

type TitleProps = React.PropsWithChildren<{
  className?: Argument;
  look?: Look;
}>;

export const Title: PolymorphicComponent<'h1', TitleProps, OnlyAs<TitleTags>> = ({
  as: As = 'h1',
  className,
  look,
  ...props
}) => {
  const display = look && ['xs', 'sm', 'md', 'lg', 'xl'].includes(look);

  const _cn = cn(className, {
    [`fr-${look}`]: (!display && look && look !== As),
    [`fr-display-${look}`]: display,
  });
  return (
    <As className={_cn} {...props} />
  );
};

export default Title;