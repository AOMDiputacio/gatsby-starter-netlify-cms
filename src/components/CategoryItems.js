import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { kebabCase, capitalize } from 'lodash'

export default function CategoryItems({ items }) {
  const tagsMap = {}
  const allTags = []
  items.forEach(
    ({
      node: {
        frontmatter: { tags },
      },
    }) => {
      tags.forEach((tag) => {
        if (!tagsMap[tag.name]) {
          tagsMap[tag.name] = 1
          allTags.push(tag)
        } else {
          tagsMap[tag.name]++
        }
      })
    }
  )
  return (
    <div className="category__items">
      {allTags.map(({ name, image }) => (
        <Link
          key={name}
          to={`/tags/${kebabCase(name)}/`}
          className="category__item"
        >
          {image && (
            <Img
              className="category__item-image"
              alt={name}
              fixed={image.childImageSharp.fixed}
            />
          )}
          <h4 className="category__item-title">{capitalize(name)}</h4>
        </Link>
      ))}
    </div>
  )
}
