import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export default function Cover({ image, title }) {
  image = getImage(image)
  return (
    <div className="cover__wrapper">
      <h1 className="cover__title">{title}</h1>
      {image && (
        <GatsbyImage className="cover__image" alt="Cover image" image={image} />
      )}
    </div>
  )
}
