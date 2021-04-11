import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { resolveLink } from '../helper/helper'

export default function ArticleItems({ items }) {
  return (
    <div className="article__items">
      {items.map(({ node }, index) => (
        <Link
          key={index}
          to={resolveLink(node.fields.slug)}
          className="article__item"
        >
          <div className="article__item-wrapper" />
          {node.frontmatter.articleImage && (
            <Img
              className="article__item-image"
              alt={node.frontmatter.title}
              fluid={node.frontmatter.articleImage.childImageSharp.fluid}
            />
          )}
          <h4 className="article__item-title">{node.frontmatter.title}</h4>
        </Link>
      ))}
    </div>
  )
}
