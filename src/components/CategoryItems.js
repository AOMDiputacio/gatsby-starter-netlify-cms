import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { kebabCase, capitalize } from 'lodash'

import { resolveLink } from '../helper/helper'

export default function CategoryItems({ items }) {
  const tagsMap = {}
  const allTags = []
  items.forEach(({ node: { frontmatter: tag } }) => {
    if (!tagsMap[tag.name]) {
      tagsMap[tag.name] = 1
      allTags.push(tag)
    } else {
      tagsMap[tag.name]++
    }
  })
  return (
    <div className="category__items">
      {allTags.map(({ name, image, altText }) => {
        image = getImage(image)
        return (
          <Link
            key={name}
            to={resolveLink(`/${kebabCase(name)}/`.toLowerCase())}
            className="category__item"
          >
            {image && (
              <GatsbyImage
                className="category__item-image"
                alt={altText ?? name}
                image={image}
              />
            )}
            <h4 className="category__item-title">{capitalize(name)}</h4>
          </Link>
        )
      })}
    </div>
  )
}
