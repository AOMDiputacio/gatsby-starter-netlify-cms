import { graphql, useStaticQuery } from 'gatsby'

export default function useArticlesPageData() {
  const data = useStaticQuery(
    graphql`
      query ARTICLES_PAGE_DATA_QUERY {
        markdownRemark(frontmatter: { dataKey: { eq: "articlesPage" } }) {
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
          }
        }
      }
    `
  )
  return data.markdownRemark.frontmatter
}
