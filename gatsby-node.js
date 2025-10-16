const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

function sortPosts(posts) {
  let priorizedPosts = posts.filter(p => p.node.frontmatter.forceOrder);
  priorizedPosts = priorizedPosts.sort((a, b) => {
    return a.node.frontmatter.forceOrder - b.node.frontmatter.forceOrder;
  });

  const nonPriorizedPosts = posts.filter(p => !p.node.frontmatter.forceOrder);

  return [...priorizedPosts, ...nonPriorizedPosts];
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const projectPageTemplate = path.resolve('./src/templates/ProjectPage.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
              edges {
                node {
                  excerpt
                  fields {
                    slug
                  }
                  frontmatter {
                    date
                    date2
                    lastUpdated
                    liveLink
                    title
                    description
                    minibio
                    projectType
                    tags
                    cover {
                      childImageSharp {
                        fluid(maxWidth: 2280) {
                          src
                          srcSet
                          base64
                          aspectRatio
                          originalImg
                          sizes
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create project pages
        const posts = sortPosts(result.data.allMarkdownRemark.edges);

        const publicPosts = posts.filter(p => !p.node.frontmatter.isHidden);
        const privatePosts = posts.filter(p => !!p.node.frontmatter.isHidden);

        _.each(publicPosts, (post, index) => {
          const previous = index === publicPosts.length - 1 ? null : publicPosts[index + 1].node;
          const next = index === 0 ? null : publicPosts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: projectPageTemplate,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        _.each(privatePosts, (post, index) => {
          createPage({
            path: post.node.fields.slug,
            component: projectPageTemplate,
            context: {
              slug: post.node.fields.slug,
              // @todo: fix this so they could also have a previous/next
            },
          })
        })
      }) 
    )
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

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-p5/,
            use: loaders.null(),
          },
          {
            test: /react-device-detect/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
