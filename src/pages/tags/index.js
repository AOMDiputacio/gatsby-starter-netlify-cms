import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import Cover from '../../components/Cover'
import CategoryItems from '../../components/CategoryItems'
import ArticleItems from '../../components/ArticleItems'

export default function TagsPage({ data: { tags, articles, pageData } }) {
  return (
    <Layout title={'Category'}>
      <section className="container category">
        <Cover
          title={pageData.frontmatter.mainTitle}
          image={pageData.frontmatter.coverImage}
        />
        <h2 className="cover__subtitle">
          {pageData.frontmatter.secondaryTitle}
        </h2>
        <CategoryItems items={tags.edges} />
        <h1 className="cool-title__wrapper">
          <span className="cool-title">
            {pageData.frontmatter.recentArticleTitle}
          </span>
        </h1>
        <ArticleItems items={articles.edges} />
      </section>
    </Layout>
  )
}

export const tagPageQuery = graphql`
  query TagsQuery {
    tags: allMarkdownRemark(
      filter: { frontmatter: { tags: { elemMatch: { name: { ne: null } } } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            tags {
              name
              image {
                childImageSharp {
                  fixed(width: 150, height: 150) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
    articles: allMarkdownRemark(
      limit: 6
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
    pageData: markdownRemark(frontmatter: { dataKey: { eq: "tagsPage" } }) {
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
        recentArticleTitle
      }
    }
  }
`
