import cn, { Argument } from 'classnames';
import { OnlyAs, PolymorphicComponent } from 'react-polymorphed';

type TextTags = 'p' | 'span';
type TextSizes = 'xs' | 'sm' | 'md' | 'lg' | 'lead';

type TextProps = React.PropsWithChildren<{
  className?: Argument;
  size?: TextSizes;
  alt?: boolean;
  bold?: boolean;
}>

export const Text: PolymorphicComponent<"p", TextProps, OnlyAs<TextTags>> = ({
  as: As = 'p',
  size,
  alt,
  bold,
  className,
  ...props
}) => {
  const _cn = cn(className, {
    'fr-text--alt': size !== 'lead' && alt,
    'fr-text--heavy': bold,
    [`fr-text--${size}`]: size && size !== 'md',
  });
  return (
    <As className={_cn} {...props} />
  );
};
