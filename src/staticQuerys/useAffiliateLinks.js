import { graphql, useStaticQuery } from 'gatsby'

export default function useAffiliateLinks() {
  const data = useStaticQuery(
    graphql`
      query AFFILIATE_LINKS_QUERY {
        allMarkdownRemark(
          filter: { frontmatter: { dataKey: { eq: "affiliateLinks" } } }
        ) {
          edges {
            node {
              frontmatter {
                id
                buttonText
                link
              }
            }
          }
        }
      }
    `
  )
  return data.allMarkdownRemark.edges
}
