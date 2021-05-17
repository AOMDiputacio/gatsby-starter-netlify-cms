import React from 'react'

import Layout from '../../components/Layout'
import Cover from '../../components/Cover'
import CategoryItems from '../../components/CategoryItems'
import ArticleItems from '../../components/ArticleItems'
import useTagsPageData from '../../staticQuerys/useTagsPageData'
import useTags from '../../staticQuerys/useTags'
import useArticles from '../../staticQuerys/useArticles'
import { joinTagArticle } from '../../helper/helper'

export default function TagsPage() {
  const pageData = useTagsPageData()
  const tags = useTags()
  const articles = useArticles()
  const joinedArticles = joinTagArticle(tags, articles)

  return (
    <Layout title="Category" description={pageData.description}>
      <section className="container category">
        <Cover title={pageData.mainTitle} image={pageData.coverImage} />
        <h2 className="cover__subtitle">{pageData.secondaryTitle}</h2>
        <CategoryItems items={tags} />
        <h3 className="cool-title__wrapper">
          <span className="cool-title">{pageData.recentArticleTitle}</span>
        </h3>
        <ArticleItems items={joinedArticles.slice(0, 3)} />
      </section>
    </Layout>
  )
}
