import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../components/Layout'
import ArticleItems from '../components/ArticleItems'
import PageProgress from '../components/PageProgress'
import useArticlePageData from '../staticQuerys/useArticlePageData'
import useTags from '../staticQuerys/useTags'
import useArticles from '../staticQuerys/useArticles'
import useAffiliateLinks from '../staticQuerys/useAffiliateLinks'
import { findByArray, joinTagArticle } from '../helper/helper'

export default function ArticlePage({ data }) {
  const pageData = useArticlePageData()
  const tags = useTags()
  const articles = useArticles()
  const affiliateLinks = useAffiliateLinks()

  const { html, frontmatter } = data.markdownRemark
  let relatedArticles = []

  if (frontmatter.relatedArticles) {
    relatedArticles = findByArray({
      arr1: articles,
      arr2: frontmatter.relatedArticles,
      cb1: (item) => item.node.frontmatter.slug,
      cb2: (item) => item.article,
    })
  }

  const joinedRelatedArticles = joinTagArticle(tags, relatedArticles)

  const replacedHtml = tweakHtml(html, affiliateLinks)

  const image = getImage(frontmatter.image)

  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
      <PageProgress />
      <section className="article-container article-page">
        <h1 className="article-page__title">{frontmatter.title}</h1>
        {image && (
          <GatsbyImage
            className="article-page__image"
            alt={frontmatter.imageAlt ?? frontmatter.title}
            image={image}
          />
        )}
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{
            __html: replacedHtml,
          }}
        />
        {joinedRelatedArticles.length > 0 && (
          <>
            <h3 className="cool-title__wrapper">
              <span className="cool-title">{pageData.relatedArticleTitle}</span>
            </h3>
            <ArticleItems items={joinedRelatedArticles} />
          </>
        )}
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ARTICLE_BY_ID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        image {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1.5
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        imageAlt
        relatedArticles {
          article
        }
      }
    }
  }
`

function tweakHtml(html, affiliateLinks) {
  const affiliateLinksMap = {}

  affiliateLinks.forEach((edge) => {
    affiliateLinksMap[edge?.node?.frontmatter?.id] = edge
  })

  return (
    html
      // chart
      .replace(/@data-chart="([^"]+)"/g, (_, value) => {
        const totalLength = 301.10565185546875
        return `
<div class="chart">
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle
    cx="50"
    cy="50"
    r="48"
    stroke-dasharray="${totalLength}"
    stroke-dashoffset="${totalLength - (value / 100) * totalLength}"
  />
</svg>
<span>
  ${value}%
</span>
</div>
  `
      })

      // responsive table
      .replace(/<table/g, '<div class="responsive-table"><table')
      .replace(/<\/table>/g, '</table></div>')

      // affiliateLinks
      .replace(/@data-link="([^"]+)"/g, (match, id) => {
        const affiliate = affiliateLinksMap[id]

        if (affiliate) {
          const link = affiliate?.node?.frontmatter?.link
          const buttonText = affiliate?.node?.frontmatter?.buttonText
          return `<a class="buy-button" rel="nofollow noreferrer noopener" target="_blank" href="${link}">${buttonText}</a>`
        } else {
          return match
        }
      })
  )
}
