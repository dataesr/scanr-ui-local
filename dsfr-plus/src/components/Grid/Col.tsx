import cn, { Argument } from 'classnames';
import { Merge } from '../../types/polymophic';

type ColSizeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ColSizeString = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
type ColSize = ColSizeString | ColSizeNumber;

type ColBaseProps = {
  className?: Argument
  xs?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  offsetXs?: ColSize;
  offsetSm?: ColSize;
  offsetMd?: ColSize;
  offsetLg?: ColSize;
  offsetXl?: ColSize;
}
export type ColProps = Merge<React.HTMLAttributes<HTMLDivElement>, ColBaseProps>;

export const Col: React.FC<ColProps> = ({
  xs, sm, md, lg, xl, offsetXs, offsetSm, offsetMd, offsetLg, offsetXl, className, ...props
}) => {
  const _className = cn('fr-col', {
    [`fr-col-${xs}`]: xs,
    [`fr-col-sm-${sm}`]: sm,
    [`fr-col-md-${md}`]: md,
    [`fr-col-lg-${lg}`]: lg,
    [`fr-col-xl-${xl}`]: xl,
    [`fr-col-offset-${offsetXs}`]: offsetXs,
    [`fr-col-offset-sm-${offsetSm}`]: offsetSm,
    [`fr-col-offset-md-${offsetMd}`]: offsetMd,
    [`fr-col-offset-lg-${offsetLg}`]: offsetLg,
    [`fr-col-offset-xl-${offsetXl}`]: offsetXl,
  }, className);
  return <div className={_className} {...props} />;
};