import { graphql, useStaticQuery } from 'gatsby'

export default function useFooterQuery() {
  const data = useStaticQuery(graphql`
    query FOOTER_QUERY {
      markdownRemark(frontmatter: { dataKey: { eq: "footer" } }) {
        frontmatter {
          column1 {
            title
            description
            socialLinks {
              facebook
              youtube
              pinterest
              linkedin
            }
          }
          column2 {
            title
            links {
              title
              link
            }
          }
          column3 {
            title
            links {
              title
              link
            }
          }
          column4 {
            title
            description
            buttonText
            placeholderText
          }
        }
      }
    }
  `)
  return data.markdownRemark.frontmatter
}
