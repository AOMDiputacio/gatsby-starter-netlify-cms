import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery, withPrefix } from 'gatsby'

import useSiteMetadata from './SiteMetadata'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Layout({
  title: pageTitle,
  description: pageDescription,
  children,
}) {
  const {
    markdownRemark: { frontmatter },
  } = useStaticQuery(graphql`
    query LangQuery {
      markdownRemark(frontmatter: { dataKey: { eq: "navbar" } }) {
        frontmatter {
          lang
        }
      }
    }
  `)
  const { title, description } = useSiteMetadata()
  return (
    <div className="root">
      <Helmet>
        <html lang={frontmatter.lang ? frontmatter.lang : 'en'} />
        <title>{pageTitle ? `${pageTitle} | ${title}` : title}</title>
        <meta name="description" content={pageDescription ?? description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
