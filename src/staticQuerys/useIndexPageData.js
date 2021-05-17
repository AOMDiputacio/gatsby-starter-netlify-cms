import { graphql, useStaticQuery } from 'gatsby'

export default function useIndexPageData() {
  const data = useStaticQuery(
    graphql`
      query INDEX_PAGE_DATA_QUERY {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
          frontmatter {
            title
            description
            subtitle
            tagline
            featureTags {
              tag
            }
            section2 {
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 500
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
              tagline
              title
              description
              buttonText
              buttonLink
            }
            featureArticles {
              articles {
                article
              }
              buttonText
            }
            section3 {
              tagline
              title
              contentList {
                title
                description
              }
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 500
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
            section4 {
              tagline
              title
              categoryList {
                tag
              }
            }
          }
        }
      }
    `
  )
  return data.markdownRemark.frontmatter
}
