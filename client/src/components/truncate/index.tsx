// https://derekmorash.com/writing/css-line-clamp-animation/
import cs, { Argument } from 'classnames';
import { Button, useDSFRConfig } from "@dataesr/dsfr-plus";
import { useEffect, useId, useState } from "react";
import './styles.scss';
import Separator from '../separator';
import { createIntl } from 'react-intl';

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});


export default function Truncate({ children, className, lines = 5 }: { children: React.ReactNode, className?: Argument, lines?: number }) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] })
  const rectId = useId();
  const innerRectId = useId();
  const [isClamped, setIsClamped] = useState(true);
  const [clamp, setClamp] = useState(true);
  const [truncateInnerRect, setTruncateInnerRect] = useState<DOMRect>();

  const onClick = () => {
    const truncateEl = document.getElementById(rectId);
    const truncateInnerEl = document.getElementById(innerRectId);
    if (truncateEl.classList.contains('expanded')) {
      truncateEl.classList.remove('expanded');
      setIsClamped(true);
      setTimeout(() => {
        truncateEl.style.setProperty('-webkit-line-clamp', lines.toString());
      }, 500);
    } else {
      truncateEl.style.setProperty('-webkit-line-clamp', "unset");
      setIsClamped(false);
      setTruncateInnerRect(truncateInnerEl.getBoundingClientRect());
      truncateEl.style.setProperty("--truncate-height-expanded", `${truncateInnerRect.height}px`);
      truncateEl.classList.add('expanded');
    }
  };

  useEffect(() => {
    const truncateEl = document.getElementById(rectId);
    const truncateInnerEl = document.getElementById(innerRectId);
    const truncateRect = truncateEl.getBoundingClientRect();
    const truncateInnerRect = truncateInnerEl.getBoundingClientRect();
    console.log(truncateRect.height, truncateInnerRect.height);

    if ((truncateRect.height === truncateInnerRect.height) || truncateInnerRect.height === 0) {
      setClamp(false)
    } else { setClamp(true); }

    truncateEl.style.setProperty("--truncate-height", `${truncateRect.height}px`);
    truncateEl.style.setProperty('-webkit-line-clamp', lines.toString());
    setTruncateInnerRect(truncateInnerRect);
  }, [rectId, innerRectId, lines]);


  return (
    <>
      <div id={rectId} className={cs("truncate", className)}>
        <div id={innerRectId} className="truncate__inner">
          {children}
        </div>
      </div >
      {clamp && (<Separator className="fr-mt-1w">
        <Button
          size='sm'
          icon={`arrow-${isClamped ? "down" : "up"}-s-line`}
          variant="text"
          onClick={onClick}
        >
          {
            isClamped
              ? intl.formatMessage({ id: "truncate.more" })
              : intl.formatMessage({ id: "truncate.less" })
          }
        </Button>
      </Separator>)}
    </>
  );
}