import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import FeatureArticleItem from '../components/FeatureArticleItem'
import { findByArray, resolveLink } from '../helper/helper'

export default function IndexPage({ data: { article, articles } }) {
  const {
    title,
    subtitle,
    tagline,
    featureTags,
    section2,
    featureArticles,
    section3,
    section4,
  } = article.frontmatter
  let finalFeatureArticles = []
  if (featureArticles.articles) {
    finalFeatureArticles = findByArray({
      arr1: articles.edges,
      arr2: featureArticles.articles,
      cb1: (item) => item.node.frontmatter.slug,
      cb2: (item) => item.article,
    })
  }
  return (
    <Layout>
      <section className="hero">
        <div className="container">
          <h1 className="hero__title">{title}</h1>
          <p className="hero__desc">{subtitle}</p>
          <strong className="hero__strong">{tagline}</strong>
        </div>
      </section>
      <section className="feature">
        <div className="feature__wrapper">
          {Object.keys(featureTags).map((key) => (
            <div key={key} className="feature__item">
              <Link to={resolveLink(featureTags[key].link)}>
                <Img
                  fluid={featureTags[key].image.childImageSharp.fluid}
                  alt="Feature tag"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="container cta">
        <div className="cta__left">
          <Img
            className="cta__image"
            fluid={section2.image.childImageSharp.fluid}
            alt={section2.title}
          />
        </div>
        <div className="cta__right">
          <strong className="cta__subtitle">{section2.tagline}</strong>
          <h1 className="cta__title">{section2.title}</h1>
          <p className="cta__desc">{section2.description}</p>
          <Link to={resolveLink(section2.buttonLink)} className="cta__link">
            {section2.buttonText}
          </Link>
        </div>
      </section>
      <section className="container feature-article">
        <div className="feature-article__wrapper">
          {finalFeatureArticles.map(
            ({ node: { frontmatter, fields } }, index) => (
              <FeatureArticleItem
                key={index}
                subtitle={frontmatter.tags[0].name}
                title={frontmatter.title}
                to={resolveLink(fields.slug)}
                linkText={featureArticles.buttonText}
              />
            )
          )}
        </div>
      </section>
      <section className="container advantage">
        <div className="advantage__left">
          <strong className="advantage__subtitle">{section3.tagline}</strong>
          <h3 className="advantage__title">{section3.title}</h3>
          {section3.contentList.map(({ title, description }, index) => (
            <React.Fragment key={index}>
              <h4 className="advantage__title2">{title}</h4>
              <p className="advantage__desc">{description}</p>
            </React.Fragment>
          ))}
        </div>
        <div className="advantage__right">
          <Img
            style={{ position: 'static' }}
            fluid={section3.image.childImageSharp.fluid}
            alt={section3.title}
          />
        </div>
      </section>
      <section className="container test">
        <div className="test__wrapper">
          <strong className="test__subtitle">{section4.tagline}</strong>
          <h3 className="test__title">{section4.title}</h3>
          <div className="test__content">
            {section4.categoryList.map(({ title, link }, index) => (
              <React.Fragment key={index}>
                {index ? <span> | </span> : ''}
                <Link to={resolveLink(link)}>{title}</Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const indexPageQuery = graphql`
  query IndexPageQuery {
    article: markdownRemark(
      frontmatter: { templateKey: { eq: "index-page" } }
    ) {
      frontmatter {
        title
        subtitle
        tagline
        featureTags {
          item1 {
            image {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            link
          }
          item2 {
            image {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            link
          }
          item3 {
            image {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            link
          }
          item4 {
            image {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            link
          }
        }
        section2 {
          image {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          tagline
          title
          description
          buttonText
          buttonLink
        }
        featureArticles {
          articles {
            article
          }
          buttonText
        }
        section3 {
          tagline
          title
          contentList {
            title
            description
          }
          image {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        section4 {
          tagline
          title
          categoryList {
            title
            link
          }
        }
      }
    }
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
            slug
            title
            tags {
              name
            }
          }
        }
      }
    }
  }
`
