import React from 'react'
import Img from 'gatsby-image'

export default function Cover({ image, title }) {
  return (
    <div className="cover__wrapper">
      <Img
        className="cover__image"
        fluid={image.childImageSharp.fluid}
        alt="Cover image"
      />
      <h1 className="cover__title">{title}</h1>
    </div>
  )
}
