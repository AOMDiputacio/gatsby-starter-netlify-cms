import React from 'react'
import { graphql } from 'gatsby'
import { capitalize } from 'lodash'

import Layout from '../components/Layout'
import Cover from '../components/Cover'
import ArticleItems from '../components/ArticleItems'
import { joinTagArticle } from '../helper/helper'

export default function TagPage({
  data: { pageData, tags, articles },
  pageContext,
}) {
  const tagTitle = pageData.frontmatter.mainTitle.replace(
    /\{\{tag\}\}/g,
    capitalize(pageContext.tag)
  )

  const joinedArticles = joinTagArticle(tags.edges, articles.edges)

  const tagArticles = joinedArticles.filter((article) =>
    Boolean(article.tags.find((tag) => tag.name === pageContext.tag))
  )

  return (
    <Layout title={tagTitle} description={pageData.frontmatter.description}>
      <section className="container tags">
        <Cover title={tagTitle} image={pageData.frontmatter.coverImage} />
        <h2 className="cover__subtitle">
          {pageData.frontmatter.secondaryTitle}
        </h2>
        <ArticleItems items={tagArticles} />
      </section>
    </Layout>
  )
}

export const tagPageQuery = graphql`
  query TagPage {
    tags: allMarkdownRemark(
      filter: { frontmatter: { dataKey: { eq: "tags" } } }
    ) {
      edges {
        node {
          frontmatter {
            id
            name
          }
        }
      }
    }
    articles: allMarkdownRemark(
      filter: { frontmatter: { dataKey: { eq: "articles" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            tags {
              tag
            }
            articleImage {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    pageData: markdownRemark(frontmatter: { dataKey: { eq: "tagPage" } }) {
      frontmatter {
        coverImage {
          childImageSharp {
            fluid(maxWidth: 1000, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
        mainTitle
        secondaryTitle
      }
    }
  }
`
