import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import useSiteMetadata from '../staticQuerys/useSiteMetadata'
import useNavbar from '../staticQuerys/useNavbar'

import '../styles/reboot.css'
import '../styles/main.css'

export default function Layout({
  title: pageTitle,
  description: pageDescription,
  children,
}) {
  const { lang } = useNavbar()
  const { title, description } = useSiteMetadata()
  return (
    <div className="root">
      <Helmet>
        <html lang={lang ? lang : 'en'} />
        <title>{pageTitle ?? title}</title>
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
