import React from 'react'

export default function CircleChart({ percent }) {
  const totalLength = 301.10565185546875
  return (
    <div className="circle-chart">
      <svg
        className="circle-chart__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="circle-chart__circle"
          cx="50"
          cy="50"
          r="48"
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength - (percent / 100) * totalLength}
        />
      </svg>
      <span className="circle-chart__value">{percent}%</span>
    </div>
  )
}
