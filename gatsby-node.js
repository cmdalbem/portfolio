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
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  excerpt
                  fields {
                    slug
                  }
                  frontmatter {
                    date
                    date2
                    title
                    forceOrder
                    description
                    minibio
                    projectType
                    tags
                    cover { 
                      childImageSharp {
                        fluid(maxWidth: 1440) {
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

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

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
