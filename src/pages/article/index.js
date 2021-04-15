import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import Cover from '../../components/Cover'
import ArticleItems from '../../components/ArticleItems'
import { joinTagArticle } from '../../helper/helper'

export default function ArticlePage({ data: { tags, articles, pageData } }) {
  const joinedArticles = joinTagArticle(tags.edges, articles.edges)

  return (
    <Layout
      title={pageData.frontmatter.mainTitle}
      description={pageData.frontmatter.description}
    >
      <section className="container article">
        <Cover
          title={pageData.frontmatter.mainTitle}
          image={pageData.frontmatter.coverImage}
        />
        <h2 className="cover__subtitle">
          {pageData.frontmatter.secondaryTitle}
        </h2>
        <ArticleItems items={joinedArticles} />
      </section>
    </Layout>
  )
}

export const articlePageQuery = graphql`
  query ArticlePageQuery {
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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { dataKey: { eq: "articles" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
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
    pageData: markdownRemark(frontmatter: { dataKey: { eq: "articlesPage" } }) {
      frontmatter {
        description
        coverImage {
          childImageSharp {
            fluid(maxWidth: 1000, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainTitle
        secondaryTitle
      }
    }
  }
`
