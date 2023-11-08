import './styles.scss';
import HistogramBar from "./bar";

export default function Histogram({ data, color = '#A558A0', unselectedColor = '#E5E5E5', height = '100px' }) {
  return (
    <div style={{ height }} className='histogram'>
      {data.slice(0, 2).map((element) => <svg className="bar"><HistogramBar onClick={() => console.log("CLICKED")} color={unselectedColor} height={element} /></svg>)}
      {data.map((element, i) => <svg key={i} className="bar"><HistogramBar onClick={() => console.log("CLICKED")} color={color} height={element} /></svg>)}
    </div>
  )
}