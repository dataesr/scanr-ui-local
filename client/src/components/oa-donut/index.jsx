// https://heyoka.medium.com/scratch-made-svg-donut-pie-charts-in-html5-2c587e935d72
import './styles.scss';

export default function OaDonut({ height = 200, percent = 15 }) {
  return (
    <div style={{ height: `${height}px` }}>
      <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
        <circle
          class="donut-ring"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#dddddd"
          stroke-width="8"
        />
        <circle
          class="donut-segment"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#3bea7e"
          stroke-width="8"
          stroke-dasharray={`${percent} ${100 - percent}`}
          stroke-dashoffset="25"
        />
        <g class="chart-text">
          <text x="50%" y="50%" class="chart-label" fill='var(--text-mention-grey)'>
            Accès ouvert
          </text>
          <text x="50%" y="50%" class="chart-number" fill='var(--text-mention-grey)'>
            {percent}%
          </text>
        </g>

      </svg>
    </div>
  )
}