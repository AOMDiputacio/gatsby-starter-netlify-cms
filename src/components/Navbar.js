import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { kebabCase, capitalize } from 'lodash'

import { MenuIcon } from './Icons'
import { mapTags, resolveLink } from '../helper/helper'

export default function Navbar() {
  const [open, setOpen] = React.useState(false)

  const data = useStaticQuery(graphql`
    query NavbarQuery {
      componentData: markdownRemark(
        frontmatter: { dataKey: { eq: "navbar" } }
      ) {
        frontmatter {
          logo {
            childImageSharp {
              fixed(width: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          menuitems {
            item
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
            }
          }
        }
      }
    }
  `)

  const { logo, menuitems } = data.componentData.frontmatter

  const tagsMap = mapTags(data.tags.edges)

  const joinedMenuitems = menuitems
    .map(({ item }) => tagsMap[item])
    .filter((item) => Boolean(item))

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
          {joinedMenuitems.map(({ name }, index) => (
            <Link
              key={index}
              className="navbar__menu-item"
              to={`/${resolveLink(kebabCase(name).toLowerCase())}`}
            >
              {capitalize(name)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
