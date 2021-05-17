import { graphql, useStaticQuery } from 'gatsby'

export default function useArticlePageData() {
  const data = useStaticQuery(
    graphql`
      query ARTICLE_PAGE_DATA_QUERY {
        markdownRemark(frontmatter: { dataKey: { eq: "articlePage" } }) {
          frontmatter {
            relatedArticleTitle
          }
        }
      }
    `
  )
  return data.markdownRemark.frontmatter
}
