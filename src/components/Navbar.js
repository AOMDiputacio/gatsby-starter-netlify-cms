import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { MenuIcon } from './Icons'
import { resolveLink } from '../helper/helper'

export default function Navbar() {
  const [open, setOpen] = React.useState(false)

  const data = useStaticQuery(graphql`
    query NavbarQuery {
      markdownRemark(frontmatter: { dataKey: { eq: "navbar" } }) {
        frontmatter {
          logo {
            childImageSharp {
              fixed(width: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          menuitems {
            title
            link
          }
        }
      }
    }
  `)

  const { logo, menuitems } = data.markdownRemark.frontmatter

  return (
    <nav className="navbar" role="navigation" aria-label="main-navigation">
      <div className="container navbar__container">
        <div className="navbar__brand">
          <Link to="/" title="Logo">
            <Img fixed={logo.childImageSharp.fixed} />
          </Link>
          <button className="navbar__button" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </button>
        </div>
        <div className={`navbar__menu ${open ? 'navbar__menu--open' : ''}`}>
          {menuitems.map(({ title, link }, index) => (
            <Link
              key={index}
              className="navbar__menu-item"
              to={resolveLink(link)}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
