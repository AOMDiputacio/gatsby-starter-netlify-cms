import { graphql, useStaticQuery } from 'gatsby'

export default function useNavbar() {
  const data = useStaticQuery(
    graphql`
      query NAVBAR_QUERY {
        markdownRemark(frontmatter: { dataKey: { eq: "navbar" } }) {
          frontmatter {
            lang
            logo {
              childImageSharp {
                gatsbyImageData(
                  width: 100
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            menuitems {
              item
            }
          }
        }
      }
    `
  )
  return data.markdownRemark.frontmatter
}
