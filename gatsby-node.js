const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {

  const { createPage } = actions

  const result = await graphql(`
    query {
      allAirtable {
        edges {
          node {
            table
            data {
              slug
            }
          }
        }
      }
    }
  `)
  // For each path, create page and choose a template.
  // values in context Object are available in that page's query
  result.data.allAirtable.edges.forEach(({ node }) => {
    createPage({
        path: `/${node.data.slug}`,
        component: path.resolve(`./src/templates/post.tsx`),
        context: {
          slug: node.data.slug
        },
    })
  })
}
