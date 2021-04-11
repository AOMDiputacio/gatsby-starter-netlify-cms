import React from 'react'
import { graphql } from 'gatsby'
import { capitalize } from 'lodash'

import Layout from '../components/Layout'
import Cover from '../components/Cover'
import ArticleItems from '../components/ArticleItems'

export default function TagPage({ data: { pageData, tags }, pageContext }) {
  const tagTitle = pageData.frontmatter.mainTitle.replace(
    /\{\{tag\}\}/g,
    capitalize(pageContext.tag)
  )
  return (
    <Layout title={tagTitle}>
      <section className="container tags">
        <Cover title={tagTitle} image={pageData.frontmatter.coverImage} />
        <h2 className="cover__subtitle">
          {pageData.frontmatter.secondaryTitle}
        </h2>
        <ArticleItems items={tags.edges} />
      </section>
    </Layout>
  )
}

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    tags: allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { elemMatch: { name: { eq: $tag } } } } }
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
    pageData: markdownRemark(frontmatter: { dataKey: { eq: "tagPage" } }) {
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
