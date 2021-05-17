import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import marked from 'marked'
import { capitalize, kebabCase } from 'lodash'

import Layout from '../components/Layout'
import FeatureArticleItem from '../components/FeatureArticleItem'
import useIndexPageData from '../staticQuerys/useIndexPageData'
import useTags from '../staticQuerys/useTags'
import useArticles from '../staticQuerys/useArticles'
import {
  findByArray,
  joinTagArticle,
  resolveLink,
  mapTags,
} from '../helper/helper'

export default function IndexPage() {
  const pageData = useIndexPageData()
  const tags = useTags()
  const articles = useArticles()

  let finalFeatureArticles = []

  if (pageData.featureArticles.articles) {
    finalFeatureArticles = findByArray({
      arr1: articles,
      arr2: pageData.featureArticles.articles,
      cb1: (item) => item.node.frontmatter.slug,
      cb2: (item) => item.article,
    })
  }

  const joinedFeatureArticles = joinTagArticle(
    tags,
    finalFeatureArticles.filter((item) => Boolean(item))
  )

  const tagsMap = mapTags(tags)

  const joinedFeatureTags = pageData.featureTags
    .map(({ tag }) => tagsMap[tag])
    .filter((item) => Boolean(item))
  const joinedCategoryTags = pageData.section4.categoryList
    .map(({ tag }) => tagsMap[tag])
    .filter((item) => Boolean(item))

  const section2Image = getImage(pageData.section2.image)
  const section3Image = getImage(pageData.section3.image)

  return (
    <Layout description={pageData.description}>
      <section className="hero">
        <div className="container">
          <h1 className="hero__title">{pageData.title}</h1>
          <div
            className="hero__desc"
            dangerouslySetInnerHTML={{ __html: marked(pageData.subtitle) }}
          />
          <strong className="hero__strong">{pageData.tagline}</strong>
        </div>
      </section>
      <section className="feature">
        <div className="feature__wrapper">
          {joinedFeatureTags.map(({ name, image, imageAlt }, index) => {
            image = getImage(image)
            return image ? (
              <div key={index} className="feature__item">
                <Link to={resolveLink(`/${kebabCase(name).toLowerCase()}`)}>
                  <GatsbyImage alt={imageAlt ?? "Feature Tag"} image={image} />
                </Link>
              </div>
            ) : null
          })}
        </div>
      </section>
      <section className="container cta">
        <div className="cta__left">
          {section2Image && (
            <GatsbyImage
              className="cta__image"
              image={section2Image}
              alt={pageData.section2.title}
            />
          )}
        </div>
        <div className="cta__right">
          <strong className="cta__subtitle">{pageData.section2.tagline}</strong>
          <h1 className="cta__title">{pageData.section2.title}</h1>
          <p className="cta__desc">{pageData.section2.description}</p>
          <Link
            to={resolveLink(pageData.section2.buttonLink)}
            className="cta__link"
          >
            {pageData.section2.buttonText}
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
              linkText={pageData.featureArticles.buttonText}
            />
          ))}
        </div>
      </section>
      <section className="container advantage">
        <div className="advantage__left">
          <strong className="advantage__subtitle">
            {pageData.section3.tagline}
          </strong>
          <h3 className="advantage__title">{pageData.section3.title}</h3>
          {pageData.section3.contentList.map(
            ({ title, description }, index) => (
              <React.Fragment key={index}>
                <h4 className="advantage__title2">{title}</h4>
                <p className="advantage__desc">{description}</p>
              </React.Fragment>
            )
          )}
        </div>
        <div className="advantage__right">
          {section3Image && (
            <GatsbyImage
              style={{ position: 'static' }}
              image={section3Image}
              alt={pageData.section3.title}
            />
          )}
        </div>
      </section>
      <section className="container test">
        <div className="test__wrapper">
          <strong className="test__subtitle">
            {pageData.section4.tagline}
          </strong>
          <h3 className="test__title">{pageData.section4.title}</h3>
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
