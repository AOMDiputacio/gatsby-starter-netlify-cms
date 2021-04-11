import React from 'react'

export default function ProductMode({ value, title, features }) {
  return (
    <div className="article-page__chart-item" style={{ paddingTop: '2rem' }}>
      <p-chart value={value} />
      <h4
        className="article-page__chart-item-header"
        style={{ marginTop: '2rem' }}
      >
        {title}
      </h4>
      {features.map((item, index) => (
        <div className="article-page__chart-list" key={index}>
          {item}
        </div>
      ))}
    </div>
  )
}
