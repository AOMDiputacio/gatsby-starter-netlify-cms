import { graphql, useStaticQuery } from 'gatsby'

export default function useTags() {
  const data = useStaticQuery(
    graphql`
      query TAGS_QUERY {
        allMarkdownRemark(
          filter: { frontmatter: { dataKey: { eq: "tags" } } }
        ) {
          edges {
            node {
              frontmatter {
                id
                name
                description
                image {
                  childImageSharp {
                    gatsbyImageData(
                      width: 500
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
