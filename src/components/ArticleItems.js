import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { kebabCase } from 'lodash'

import { resolveLink } from '../helper/helper'

export default function ArticleItems({ items }) {
  return (
    <div className="article__items">
      {items.map(({ cardTitle, image, imageAlt, slug, tags }, index) => {
        image = getImage(image)
        return (
          <Link
            key={index}
            to={resolveLink(
              `/${kebabCase(tags[0].name)}/${kebabCase(slug)}`.toLowerCase()
            )}
            className="article__item"
          >
            {image && (
              <GatsbyImage
                className="article__item-image"
                alt={imageAlt ?? cardTitle}
                image={image}
              />
            )}
            <h4 className="article__item-title">{cardTitle}</h4>
          </Link>
        )
      })}
    </div>
  )
}
