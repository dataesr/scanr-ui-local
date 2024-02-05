import { Col, Link, Row, Text } from '@dataesr/dsfr-plus';
import styles from './styles.module.scss';
import cs from 'classnames';

function HistogramBar({ width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
    >
      <g fill="#222222" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g>
          <rect
            height="10px"
            width={`${width}%`}
            x="0"
            y="0"
            fill='#fee9e5'
            rx="4"
            ry="4"
          />
        </g>
      </g>
    </svg>
  )
}

export default function BarLink({ name, href, width, count }) {
  return (
    <Row className="fr-p-1v fr-enlarge-link">
      <Text bold size="xs" className={cs(styles.ellipsis, "fr-mb-1v fr-pr-1v")}>
        {href ? <Link href={href}>{name}</Link> : name}
      </Text>
      <Text as="span" size="xs" className="fr-mb-1v">({count})</Text>
      <Col xs="12">
        <div className={cs(styles.histogram)}>
          <svg width="100%" className="bar"><HistogramBar width={width} /></svg>
        </div>
      </Col>
    </Row>
  )
}