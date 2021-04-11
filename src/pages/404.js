import { Link } from 'gatsby'
import React from 'react'

import Layout from '../components/Layout'

export default function NotFoundPage() {
  return (
    <Layout title="404 | Not found">
      <div className="not-found">
        <h1 className="not-found__headaer">
          404 <span className="not-found__dash">|</span> NOT FOUND
        </h1>
        <Link className="not-found__back-button" to="/">
          Go Back
        </Link>
      </div>
    </Layout>
  )
}
