import { Col, Link, Row, Text } from "@dataesr/dsfr-plus";
import styles from "./styles.module.scss";
import cs from "classnames";

export type HistogramBarProps = {
  width: number;
  height?: number;
  color?: string;
};

export type BarLinkProps = {
  name: string;
  href?: string;
  width: number;
  count: number;
  color?: string;
};

function HistogramBar({ width, height = 10, color = "#FF9575" }: HistogramBarProps) {
  return (
    <g fill="#222222" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g>
        <rect
          height={`${height}px`}
          width={`${width}%`}
          x="0"
          y="0"
          fill={color}
          rx={height / 2}
          ry={height / 2}
        />
      </g>
    </g>
  );
}

export default function BarLink({ name, href, width, count, color = "#FF9575", height = 10 }) {
  return (
    <Row className={cs("fr-p-1v", { "fr-enlarge-link": !!href })}>
      <Text bold size="xs" className={cs(styles.ellipsis, "fr-mb-1v fr-pr-1v")}>
        {href ? <Link href={href}>{name}</Link> : name}
      </Text>
      <Text as="span" size="xs" className="fr-mb-1v">
        ({count})
      </Text>
      <Col xs="12">
        <div className={cs(styles.histogram)}>
          <svg width="100%" className={cs("bar", { pointer: !!href })} xmlns="http://www.w3.org/2000/svg" >
            <HistogramBar width={width} color={color} height={height} />
          </svg>
        </div>
      </Col>
    </Row>
  );
}
