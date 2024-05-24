// https://derekmorash.com/writing/css-line-clamp-animation/
import cs, { Argument } from "classnames";
import { Button, Row, useDSFRConfig } from "@dataesr/dsfr-plus";
import { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { createIntl } from "react-intl";

const modules = import.meta.glob("./locales/*.json", {
  eager: true,
  import: "default",
});
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] };
  }
  return acc;
}, {});

export default function Truncate({
  children,
  className,
  lines = 5,
}: {
  children: React.ReactNode;
  className?: Argument;
  lines?: number;
}) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] });
  const truncateEl = useRef<HTMLDivElement>();
  const truncateInnerEl = useRef<HTMLDivElement>();
  const [isClamped, setIsClamped] = useState(true);
  const [clamp, setClamp] = useState(false);
  const [truncateInnerRect, setTruncateInnerRect] = useState<DOMRect>();

  useEffect(() => {
    if (!isClamped && truncateEl.current && truncateInnerEl.current) {
      const truncateInnerRect = truncateInnerEl.current.getBoundingClientRect();
      truncateEl.current.style.setProperty(
        "--truncate-height-expanded",
        `${truncateInnerRect.height}px`
      );
      truncateEl.current.classList.add("expanded");
    }
  }, [isClamped]);

  const onClick = () => {
    if (!truncateEl?.current || !truncateInnerEl?.current) return;
    if (truncateEl.current.classList.contains("expanded")) {
      truncateEl.current.classList.remove("expanded");
      setIsClamped(true);
      setTimeout(() => {
        truncateEl.current.style.setProperty(
          "-webkit-line-clamp",
          lines.toString()
        );
      }, 500);
    } else {
      truncateEl.current.style.setProperty("-webkit-line-clamp", "unset");
      setIsClamped(false);
      setTruncateInnerRect(truncateInnerEl.current.getBoundingClientRect());
      truncateEl.current.style.setProperty(
        "--truncate-height-expanded",
        `${truncateInnerRect.height}px`
      );
      truncateEl.current.classList.add("expanded");
    }
  };

  useEffect(() => {
    if (!truncateEl?.current || !truncateInnerEl?.current) return;
    truncateEl.current.style.setProperty(
      "-webkit-line-clamp",
      lines.toString()
    );
    const truncateRect = truncateEl.current.getBoundingClientRect();
    const truncateInnerRect = truncateInnerEl.current.getBoundingClientRect();
    truncateEl.current.style.setProperty(
      "--truncate-height",
      `${truncateRect.height}px`
    );
    setTruncateInnerRect(truncateInnerRect);

    if (truncateEl.current.scrollHeight > truncateEl.current.clientHeight) {
      setClamp(true);
      truncateEl.current.classList.remove("expanded");
    }
  }, [lines]);

  return (
    <div>
      <div ref={truncateEl} className={cs("truncate", "expanded", className)}>
        <div ref={truncateInnerEl}>{children}</div>
      </div>
      {clamp && (
        <Row horizontalAlign="center">
          <Button
            className="fr-mt-2w"
            size="sm"
            icon={`arrow-${isClamped ? "down" : "up"}-s-line`}
            variant="text"
            onClick={onClick}
          >
            {isClamped
              ? intl.formatMessage({ id: "truncate.more" })
              : intl.formatMessage({ id: "truncate.less" })}
          </Button>
        </Row>
      )}
    </div>
  );
}
