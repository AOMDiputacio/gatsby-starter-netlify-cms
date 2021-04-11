import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import Cover from '../../components/Cover'
import ArticleItems from '../../components/ArticleItems'

export default function ArticlePage({ data: { articles, pageData } }) {
  return (
    <Layout title={pageData.frontmatter.mainTitle}>
      <section className="container article">
        <Cover
          title={pageData.frontmatter.mainTitle}
          image={pageData.frontmatter.coverImage}
        />
        <h2 className="cover__subtitle">
          {pageData.frontmatter.secondaryTitle}
        </h2>
        <ArticleItems items={articles.edges} />
      </section>
    </Layout>
  )
}

export const articlePageQuery = graphql`
  query ArticlePageQuery {
    articles: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "article-page" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
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
