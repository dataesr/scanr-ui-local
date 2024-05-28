export default function Gauge({ label = "", color = "#aaa", percent }) {
  return (
    <>
      <div style={{ display: "inline-block", width: "50%" }}>{label}</div>
      <div
        style={{ display: "inline-block", width: "50%", height: "13px", border: "1px solid #dddddd", borderRadius: "3px" }}
      >
        <div style={{ width: percent + "%", backgroundColor: color, height: "100%" }} />
      </div>
    </>
  )
}
