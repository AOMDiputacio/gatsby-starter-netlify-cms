const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      pages: allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { templateKey: { ne: null } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
      articles: allMarkdownRemark(
        filter: { frontmatter: { dataKey: { eq: "articles" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              tags {
                tag
              }
            }
          }
        }
      }
      tags: allMarkdownRemark(
        filter: { frontmatter: { dataKey: { eq: "tags" } } }
      ) {
        edges {
          node {
            frontmatter {
              id
              name
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const articles = result?.data?.articles?.edges || []
    const tags = result?.data?.tags?.edges || []
    const pages = result?.data?.pages?.edges || []

    const tagsMap = {}
    tags.forEach((edge) => {
      if (edge?.node?.frontmatter?.id && edge?.node?.frontmatter) {
        tagsMap[edge.node.frontmatter.id] = edge.node.frontmatter
      }
    })

    articles.forEach((edge) => {
      if (
        edge?.node?.frontmatter?.tags?.[0]?.tag &&
        edge?.node?.frontmatter?.slug &&
        edge?.node?.id
      ) {
        const id = edge.node.id
        const firstTag = tagsMap[edge.node.frontmatter.tags[0].tag]
        if (firstTag) {
          const articlePath = `/${_.kebabCase(firstTag.name)}/${_.kebabCase(
            edge.node.frontmatter.slug
          )}/`.toLowerCase()

          createPage({
            path: articlePath,
            component: path.resolve(`src/templates/article-page.js`),
            context: {
              id,
            },
          })
        }
      }
    })

    const tagsNames = tags
      .map((edge) => edge?.node?.frontmatter?.name)
      .filter((item) => Boolean(item))

    _.uniq(tagsNames).forEach((tag) => {
      const tagPath = `/${_.kebabCase(tag)}/`.toLowerCase()

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags-page.js`),
        context: {
          tag,
        },
      })
    })

    pages.forEach((edge) => {
      if (
        edge?.node?.id &&
        edge?.node?.fields?.slug &&
        edge?.node?.frontmatter?.templateKey
      ) {
        const id = edge.node.id
        createPage({
          path: edge.node.fields.slug,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          context: {
            id,
          },
        })
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
