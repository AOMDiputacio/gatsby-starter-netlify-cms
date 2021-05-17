import React from 'react'
import { capitalize } from 'lodash'

import Layout from '../components/Layout'
import Cover from '../components/Cover'
import ArticleItems from '../components/ArticleItems'
import useTagPageData from '../staticQuerys/useTagPageData'
import useTags from '../staticQuerys/useTags'
import useArticles from '../staticQuerys/useArticles'
import { joinTagArticle } from '../helper/helper'

export default function TagPage({ pageContext }) {
  const pageData = useTagPageData()
  const tags = useTags()
  const articles = useArticles()

  const tagPageTitle = pageData.mainTitle.replace(
    /\{\{tag\}\}/g,
    capitalize(pageContext.tag)
  )

  const joinedArticles = joinTagArticle(tags, articles)

  const tagArticles = joinedArticles
    .filter((article) =>
      Boolean(article.tags.find((tag) => tag.name === pageContext.tag))
    )
    .filter((item) => Boolean(item))

  return (
    <Layout title={tagPageTitle} description={tags.description}>
      <section className="container tags">
        <Cover title={tagPageTitle} image={pageData.coverImage} />
        <h2 className="cover__subtitle">{pageData.secondaryTitle}</h2>
        <ArticleItems items={tagArticles} />
      </section>
    </Layout>
  )
}
