import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import Cover from '../../components/Cover'
import CategoryItems from '../../components/CategoryItems'
import ArticleItems from '../../components/ArticleItems'
import { joinTagArticle } from '../../helper/helper'

export default function TagsPage({ data: { tags, articles, pageData } }) {
  const joinedArticles = joinTagArticle(tags.edges, articles.edges)

  return (
    <Layout title="Category" description={pageData.frontmatter.description}>
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
        <ArticleItems items={joinedArticles} />
      </section>
    </Layout>
  )
}

export const tagPageQuery = graphql`
  query TagsQuery {
    tags: allMarkdownRemark(
      filter: { frontmatter: { dataKey: { eq: "tags" } } }
    ) {
      edges {
        node {
          frontmatter {
            id
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
    articles: allMarkdownRemark(
      limit: 6
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
    pageData: markdownRemark(frontmatter: { dataKey: { eq: "tagsPage" } }) {
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
        recentArticleTitle
      }
    }
  }
`
