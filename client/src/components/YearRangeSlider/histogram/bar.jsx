import './styles.scss';
export default function HistogramBar({ height, color = '#A558A0', ...rest }) {
  const y = `${100 - height}%`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
      {...rest}
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g>
          <rect
            width="100%"
            height="100%"
            x="0"
            y="0"
          />
          <rect
            width="100%"
            height={`${height}%`}
            x="0"
            y={y}
            fill={color}
          />
        </g>
      </g>
    </svg >
  )
}