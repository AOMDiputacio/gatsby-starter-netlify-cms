const _ = require(`lodash`)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
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
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
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
      component: path.resolve(`src/templates/tag-page.js`),
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
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      title: String
      description: String
    }

    type MarkdownRemark implements Node {
      fields: Fields
      frontmatter: Frontmatter
    }

    type Fields {
      slug: String
    }

    type Frontmatter {
      templateKey: String
      dataKey: String
      id: String
      title: String
      description: String
      date: Date @dateformat
      link: String
      relatedArticleTitle: String
      slug: String
      mainTitle: String
      secondaryTitle: String
      subtitle: String
      tagline: String
      lang: String
      name: String
      recentArticleTitle: String
      imageAlt: String
      logo: File @fileByRelativePath
      image: File @fileByRelativePath
      coverImage: File @fileByRelativePath

      tags: [Tags]
      featureTags: [Tags]

      column1: Column1
      column2: LinksColumn
      column3: LinksColumn
      column4: Column4

      section2: Section2
      featureArticles: FeatureArticles
      section3: Section3
      section4: Section4

      menuitems: [Menuitems]

      relatedArticles: [Articles]
    }

    type Tags {
      tag: String
    }

    type Column1 {
      title: String
      description: String
      socialLinks: SocialLinks
    }
    type Column4 {
      title: String
      description: String
      buttonText: String
      placeholderText: String
    }
    type SocialLinks {
      facebook: String
      youtube: String
      pinterest: String
      linkedin: String
    }
    type LinksColumn {
      title: String
      links: [Links]
    }
    type Links {
      title: String
      link: String
    }

    type Section2 {
      image: File @fileByRelativePath
      tagline: String
      title: String
      description: String
      buttonText: String
      buttonLink: String
    }
    type FeatureArticles {
      articles: [Articles]
      buttonText: String
    }
    type Articles {
      article: String
    }
    type Section3 {
      tagline: String
      title: String
      contentList: [ContentList]
      image: File @fileByRelativePath
    }
    type ContentList {
      title: String
      description: String
    }
    type Section4 {
      tagline: String
      title: String
      categoryList: [Tags]
    }
    type Menuitems {
      item: String
    }
  `)
}
