import { graphql, useStaticQuery } from 'gatsby'

export default function useTagPageData() {
  const data = useStaticQuery(
    graphql`
      query TAG_PAGE_DATA_QUERY {
        markdownRemark(frontmatter: { dataKey: { eq: "tagPage" } }) {
          frontmatter {
            mainTitle
            secondaryTitle
            coverImage {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    `
  )
  return data.markdownRemark.frontmatter
}
