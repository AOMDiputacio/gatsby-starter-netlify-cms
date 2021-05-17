import { graphql, useStaticQuery } from 'gatsby'

export default function useTagsPageData() {
  const data = useStaticQuery(
    graphql`
      query TAGS_PAGE_DATA_QUERY {
        markdownRemark(frontmatter: { dataKey: { eq: "tagsPage" } }) {
          frontmatter {
            mainTitle
            secondaryTitle
            description
            coverImage {
              childImageSharp {
                gatsbyImageData(
                  width: 500
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            recentArticleTitle
          }
        }
      }
    `
  )
  return data.markdownRemark.frontmatter
}
