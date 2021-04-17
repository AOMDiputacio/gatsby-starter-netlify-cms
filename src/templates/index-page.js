import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import marked from 'marked'
import { capitalize, kebabCase } from 'lodash'

import Layout from '../components/Layout'
import FeatureArticleItem from '../components/FeatureArticleItem'
import {
  findByArray,
  joinTagArticle,
  resolveLink,
  mapTags,
} from '../helper/helper'

export default function IndexPage({ data: { tags, articles, pageData } }) {
  const {
    title,
    description,
    subtitle,
    tagline,
    featureTags,
    section2,
    featureArticles,
    section3,
    section4,
  } = pageData.frontmatter

  let finalFeatureArticles = []

  if (featureArticles.articles) {
    finalFeatureArticles = findByArray({
      arr1: articles.edges,
      arr2: featureArticles.articles,
      cb1: (item) => item.node.frontmatter.slug,
      cb2: (item) => item.article,
    })
  }

  const joinedFeatureArticles = joinTagArticle(
    tags.edges,
    finalFeatureArticles.filter((item) => Boolean(item))
  )

  const tagsMap = mapTags(tags.edges)

  const joinedFeatureTags = featureTags
    .map(({ tag }) => tagsMap[tag])
    .filter((item) => Boolean(item))
  const joinedCategoryTags = section4.categoryList
    .map(({ tag }) => tagsMap[tag])
    .filter((item) => Boolean(item))

  return (
    <Layout description={description}>
      <section className="hero">
        <div className="container">
          <h1 className="hero__title">{title}</h1>
          <div
            className="hero__desc"
            dangerouslySetInnerHTML={{ __html: marked(subtitle) }}
          />
          <strong className="hero__strong">{tagline}</strong>
        </div>
      </section>
      <section className="feature">
        <div className="feature__wrapper">
          {joinedFeatureTags.map(({ name, image }, index) => (
            <div key={index} className="feature__item">
              <Link to={resolveLink(`/${kebabCase(name).toLowerCase()}`)}>
                <Img fluid={image.childImageSharp.fluid} alt="Feature tag" />
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
          {joinedFeatureArticles.map(({ title, slug, tags }, index) => (
            <FeatureArticleItem
              key={index}
              subtitle={tags[0].name}
              title={title}
              to={resolveLink(
                `/${kebabCase(tags[0].name)}/${kebabCase(slug)}`.toLowerCase()
              )}
              linkText={featureArticles.buttonText}
            />
          ))}
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
            {joinedCategoryTags.map(({ name }, index) => (
              <React.Fragment key={index}>
                {index ? <span> | </span> : ''}
                <Link to={resolveLink(`/${kebabCase(name).toLowerCase()}`)}>
                  {capitalize(name)}
                </Link>
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
    pageData: markdownRemark(
      frontmatter: { templateKey: { eq: "index-page" } }
    ) {
      frontmatter {
        title
        description
        subtitle
        tagline
        featureTags {
          tag
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
            tag
          }
        }
      }
    }
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
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
            slug
            title
            tags {
              tag
            }
          }
        }
      }
    }
  }
`
