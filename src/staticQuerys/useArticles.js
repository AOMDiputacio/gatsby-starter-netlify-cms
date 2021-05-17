import { graphql, useStaticQuery } from 'gatsby'

export default function useArticles() {
  const data = useStaticQuery(
    graphql`
      query ARTICLES_QUERY {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { dataKey: { eq: "articles" } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                cardTitle
                slug
                tags {
                  tag
                }
                image {
                  childImageSharp {
                    gatsbyImageData(
                      aspectRatio: 1.5
                      layout: FULL_WIDTH
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
                imageAlt
              }
            }
          }
        }
      }
    `
  )
  return data.allMarkdownRemark.edges
}
