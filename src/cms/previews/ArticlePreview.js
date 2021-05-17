import React from 'react'

import '../../styles/reboot.css'
import '../../styles/main.css'

export default function ArticlePreview({ entry, widgetFor, getAsset }) {
  return (
    <section className="container article-page">
      <h1 className="article-page__title">{entry.getIn(['data', 'title'])}</h1>
      <img alt="Article cover" src={getAsset(entry.getIn(['data', 'image']))} />
      <div className="markdown-content">{widgetFor('body')}</div>
    </section>
  )
}
